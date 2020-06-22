import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import { logger } from '../lib/logger';
import HttpException from '../lib/http-exception';
import { sendRequestCvEmail } from './controller.helper';
import { checkToken } from '../middleware/checktoken.middleware';
import { QrGenerator } from '../lib/qr';
export const authController = express.Router();

const isDevMode:boolean = process.env.NODE_ENV === "development" || false;
const JWT_SECRET = process.env.JWT_SECRET;

/**
 * auth
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
            date: today.toUTCString(),
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
 * auth
 */
authController.get('/request_cv/:token', checkToken, async (req:express.Request, res:express.Response) => {
    const { token } = req.params;
    const pic = await QrGenerator(token);

    res.status(200).send({...req.user, oh: pic});
}, (err:Error, req:express.Request, res: express.Response, next:express.NextFunction) => {
    res.redirect(`/about/cv/error${err.message ? '?message=' + err.message : ''}`)
});
