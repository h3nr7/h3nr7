/** Required External Modules and Interfaces */
import * as express from "express";
import * as axios from 'axios';
import { checkToken } from "../middleware/checktoken.middleware";

/** Router Definition */
export const usersController = express.Router();

/** Controller Definitions */
// simply return the user if token is correct
usersController.get("/me", checkToken, async (req: express.Request, res: express.Response) => {
    res.status(200).send(req.user);
});