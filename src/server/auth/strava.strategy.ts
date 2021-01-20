import * as OAuth2Strategy from 'passport-oauth2';
import * as refresh from 'passport-oauth2-refresh';
import { NextFunction, Response, Request } from 'express';
import { stravaService } from '../service/strava.service';
import { transAthleteRes } from '../controller/helper/strava.controller.helper';
import { AthleteModel } from '../model/athlete.model';
import { logger } from '../lib/logger';

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
    if(!req.session.passport || !req.session.passport.user || !req.session.passport.user.accessToken) {
            res.redirect(`/${process.env.STRAVA_AUTH_PATH}`);
            return;
    }

    const { accessToken, refreshToken } = req?.session?.passport?.user;

    try {
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
            req.session.passport.user.profile = transAthleteRes(dbAthlete);
            next();
        } else {
            res.redirect(`/${process.env.STRAVA_AUTH_PATH}`);
        }
    } catch(e) {
        if(!refreshToken) res.redirect(`/${process.env.STRAVA_AUTH_PATH}`);
        refresh.requestNewAccessToken('oauth2', refreshToken, (err, nAccessToken, nRefreshToken) => {
            if(err) {
                logger.error('Error with request new access token');
                res.redirect(`/${process.env.STRAVA_AUTH_PATH}`);
            }
            req.session.passport.user.accessToken = nAccessToken;
            req.session.passport.user.refreshToken = nRefreshToken;
            next();
        });
    }
}

export const authApiIsClubAdmin = async (req: Request, res: Response, next: NextFunction) => {
    if(
        !req.session.passport ||
        !req.session.passport.user || 
        !req.session.passport.user.accessToken) {
        res.status(401).json({status: 401, message: 'Not authorized by strava.'})
    }

    try {
        const { clubId } = req.params;
        const club = await stravaService.getClub(clubId, req.session.passport.user.accessToken);
        console.log('auth api club', club);
        if(!club.admin) {
            return res.status(401).send({status: 401, message: 'Not an admin of the club'});
        }

        next();

    } catch(e) {
        return res.status(401).send({status: 401, message: 'Not an admin of the club'});
    }

}

export const authApiRequired = (req: Request, res: Response, next: NextFunction) => { 
    if(
        !req.session.passport ||
        !req.session.passport.user || 
        !req.session.passport.user.accessToken) {
            res.status(401).json({status: 401, message: 'Not authorized by strava.'})
    }

    next();

}
