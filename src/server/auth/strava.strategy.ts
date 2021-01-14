import * as OAuth2Strategy from 'passport-oauth2';
import { NextFunction, Response, Request } from 'express';
import { stravaService } from '../service/strava.service';
import { transAthleteRes } from '../controller/helper/strava.controller.helper';
import { AthleteModel } from '../model/athlete.model';

/**
 * STRATEGY
 */
export const StravaStrategy = new OAuth2Strategy({
    authorizationURL: process.env.STRAVA_AUTH_URL,
    tokenURL: process.env.STRAVA_TOKEN_URL,
    clientID: process.env.STRAVA_CLIENT_ID,
    clientSecret: process.env.STRAVA_CLIENT_SECRET,
    callbackURL: process.env.STRAVA_CALLBACK_PATH,
    scope: "activity:read"
}, verify)

function verify(accessToken: string, refreshToken: string, profile: any, cb: any) {
    cb(null, { type:'strava', accessToken, refreshToken, profile });
}

export const authRequired = async (req: Request, res: Response, next: NextFunction) => { 

    if(!req.user || !req.user.accessToken) {
            res.redirect(`/${process.env.STRAVA_AUTH_PATH}`);
            return;
    }

    const { accessToken } = req?.user;

    const athlete = await stravaService.getAthlete(accessToken);
    const { id, ...resAthlete } = athlete;
    const dbAthlete = await AthleteModel.findOneAndUpdate(
        { stravaId: id },
        {
            stravaId: id,
            ...resAthlete
        }
    , { upsert: true });
    if(dbAthlete) {
        req.user.profile = transAthleteRes(dbAthlete);
        next();
    } else {
        res.redirect(`/${process.env.STRAVA_AUTH_PATH}`);
    }
}

export const authApiRequired = (req: Request, res: Response, next: NextFunction) => { 
    if(
        !req.user || 
        !req.user.accessToken) {
            res.status(401).json({status: 401, message: 'Not authorized by strava.'})
    }

    next();

}
