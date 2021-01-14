import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import * as passport from 'passport';
import { logger } from '../lib/logger';
import HttpException from '../lib/http-exception';
import { sendRequestCvEmail } from './helper/auth.controller.helper';
import { checkToken } from '../middleware/checktoken.middleware';
import { QrGenerator } from '../lib/qr';
export const authController = express.Router();

const isDevMode:boolean = process.env.NODE_ENV === "development" || false;
const JWT_SECRET = process.env.JWT_SECRET;

/**
 * auth for request CV 
 */
authController.post('/request_cv', async (req:express.Request, res:express.Response) => {
    try {   
        const { email, firstName, lastName, cvId } = req.body;
        if (!email) throw new HttpException(422, 'Email , firstName, and lastName are required');

        const today = new Date();
        const expirationDate = new Date(today);
        // token last for 14 days only
        expirationDate.setDate(today.getDate() + 60);

        // generate token
        const token = await jwt.sign({
            email, firstName, lastName, cvId,
            date: parseInt(String(today.getTime()/1000), 10),
            exp: parseInt(String(expirationDate.getTime()/1000), 10)
        }, JWT_SECRET);

        const baseUrl = `${req.protocol}://${req.hostname}${isDevMode && req.socket.localPort ? `:${req.socket.localPort}` : ''}`;
        const response = await sendRequestCvEmail(email, firstName, lastName, baseUrl, token);
        // test if working
        if(isDevMode) logger.info(response);
        res.status(200).send({status: 'success'});

    } catch(e) {
        res.status(404).send(e.message);

    }
});

/**
 * auth, verify even if token has expired
 */
authController.get('/request_cv/:token', checkToken(true), async (req:express.Request, res:express.Response) => {
    const { token } = req.params;
    const pic = await QrGenerator(token);

    res.status(200).send({...req.user, tokenImg: pic});
}, (err:Error, req:express.Request, res: express.Response, next:express.NextFunction) => {
    res.redirect(`/about/cv/error${err.message ? '?message=' + err.message : ''}`)
});

/**
 * strava oauth2 middleware
 */
authController.get('/strava', passport.authenticate('oauth2'));

/**
 * strava oath2 callback
 */
authController.get(
    '/strava/callback', 
    passport.authenticate('oauth2', { 
        failureRedirect: '/auth/failed'
     }),
    (req: express.Request, res: express.Response) => {
        res.redirect('/strava/profile');
    }
);
