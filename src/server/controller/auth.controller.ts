import * as express from 'express';
import axios from 'axios';
import { AxiosRequestConfig } from 'axios'
import HttpException from '../lib/http-exception';
const LINKEDIN_URL = process.env.LINKEDIN_URL;
const LINKEDIN_CLIENTID = process.env.LINKEDIN_CLIENTID;
const LINKEDIN_CLIENT_SECRET = process.env.LINKEDIN_CLIENT_SECRET;

export const authController = express.Router();


authController.get('/callback', async (req:express.Request, res:express.Response) => {
    const { code, error } = req.query;
    try {
        if(!code) throw new HttpException(404, `Callback code is missing or invalid. ${error? String(error).toUpperCase():''}`);
        const params = {
            'grant_type': 'authorization_code',
            'code': code,
            'redirect_uri': `${req.protocol}://${req.headers.host}/auth/callback`,
            'client_id': LINKEDIN_CLIENTID,
            'client_secret': LINKEDIN_CLIENT_SECRET
        };

        const opts:AxiosRequestConfig = {
            method: 'POST',
            params,
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            url: `${LINKEDIN_URL}/oauth/v2/accessToken`
        };

        const response = await axios.request(opts)
            .then(res => res.data);
        res.status(200).send(response);
    } catch(e) {
        console.error('Linkedin auth error: ', e.response);
        res.status(404).send(e.message);
    }
});