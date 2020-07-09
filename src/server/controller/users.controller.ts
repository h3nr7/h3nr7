/** Required External Modules and Interfaces */
import * as express from "express";
import * as axios from 'axios';
import { checkToken } from "../middleware/checktoken.middleware";
import { QrGenerator } from '../lib/qr';

/** Router Definition */
export const usersController = express.Router();

/** Controller Definitions */
// simply return the user if token is correct
usersController.get("/me", checkToken(false), async (req: express.Request, res: express.Response) => {
    const pic = await QrGenerator(req.token);
    const response = {
        ...req.user,
        tokenImg: pic
    }
    res.status(200).send(response);
});