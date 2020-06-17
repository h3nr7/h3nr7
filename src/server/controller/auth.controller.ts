import * as express from 'express';
import * as qs from 'querystring';
import axios from 'axios';
import { AxiosRequestConfig } from 'axios'
import HttpException from '../lib/http-exception';
import { urlencoded } from 'body-parser';
const LINKEDIN_URL = process.env.LINKEDIN_URL;
const LINKEDIN_CLIENTID = process.env.LINKEDIN_CLIENTID;
const LINKEDIN_CLIENT_SECRET = process.env.LINKEDIN_CLIENT_SECRET;

export const authController = express.Router();

/**
 * auth linkedin
 */
authController.get('/linkedin', (req:express.Request, res:express.Response) => {
    const scope = ['r_liteprofile', 'r_emailaddress', 'w_member_social'];
    const query = qs.stringify({
        'response_type':'code',
        'redirect_uri': `${req.protocol}://${req.headers.host}/auth/linkedin/callback`,
        'client_id': LINKEDIN_CLIENTID,
        'scope': scope.join(' ')
    });
    console.log('qq', query);
    res.redirect(`${LINKEDIN_URL}/oauth/v2/authorization?${query}`)
});

/**
 * linkedin callback
 */
authController.get('/linkedin/callback', async (req:express.Request, res:express.Response) => {
    const { code, error } = req.query;
    try {
        if(!code) throw new HttpException(404, `Callback code is missing or invalid. ${error? String(error).toUpperCase():''}`);
        const params = {
            'grant_type': 'authorization_code',
            'code': code,
            'redirect_uri': `${req.protocol}://${req.headers.host}/auth/linkedin/callback`,
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
        const query = qs.stringify(response);
        res.redirect(`/user/authorized?${query}`);
    } catch(e) {
        console.error('Linkedin auth error: ', e.response);
        res.status(404).send(e.message);
    }
});