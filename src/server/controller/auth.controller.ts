import * as express from 'express';
import HttpException from '../lib/http-exception';
import * as jwt from 'jsonwebtoken';
import { sendRequestCvEmail } from './controller.helper';
export const authController = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;

/**
 * auth
 */
authController.post('/request_cv', async (req:express.Request, res:express.Response) => {
    try {   
        const {
            email, firstName, lastName
        } = req.body;
        if (!email) throw new HttpException(422, 'Email , firstName, and lastName are required');
        const today = new Date();
        const expirationDate = new Date(today);
        // token last for 14 days only
        expirationDate.setDate(today.getDate() + 14);

        const token = await jwt.sign({
            email, firstName, lastName,
            date: today.getDate(),
            exp: parseInt(String(expirationDate.getTime()/1000), 10)
        }, JWT_SECRET);

        await sendRequestCvEmail(email, firstName, lastName, token);

    } catch(e) {

    }
});

// /**
//  * linkedin callback
//  */
// authController.get('/linkedin/callback', async (req:express.Request, res:express.Response) => {
//     const { code, error } = req.query;
//     try {
//         if(!code) throw new HttpException(404, `Callback code is missing or invalid. ${error? String(error).toUpperCase():''}`);
//         const params = {
//             'grant_type': 'authorization_code',
//             'code': code,
//             'redirect_uri': `${req.protocol}://${req.headers.host}/auth/linkedin/callback`,
//             'client_id': LINKEDIN_CLIENTID,
//             'client_secret': LINKEDIN_CLIENT_SECRET
//         };

//         const opts:AxiosRequestConfig = {
//             method: 'POST',
//             params,
//             headers: { 'content-type': 'application/x-www-form-urlencoded' },
//             url: `${LINKEDIN_URL}/oauth/v2/accessToken`
//         };

//         const response = await axios.request(opts)
//             .then(res => res.data);
//         const query = qs.stringify(response);
//         res.redirect(`/user/authorized?${query}`);
//     } catch(e) {
//         console.error('Linkedin auth error: ', e.response);
//         res.status(404).send(e.message);
//     }
// });