/** Required External Modules and Interfaces */
import * as express from "express";
import * as axios from 'axios';

const LINKEDIN_API_URL = process.env.LINKEDIN_API_URL;

/** Router Definition */
export const usersController = express.Router();

/** Controller Definitions */
// get user self details
usersController.get("/me", async (req: express.Request, res: express.Response) => {
    const { authorization } = req.headers;
    const bearer = authorization.split(' ');
    const token = bearer[1];

    try {
        const config:axios.AxiosRequestConfig = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const user = await axios.default.get(`${LINKEDIN_API_URL}/me`, config).then(res => res.data);
        res.status(200).send(user);
    } catch(e) {
        res.status(404).send(e.message);
    }
});