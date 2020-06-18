/** Required External Modules and Interfaces */
import * as express from "express";
import * as axios from 'axios';

/** Router Definition */
export const usersController = express.Router();

/** Controller Definitions */
// get user self details
usersController.get("/me", async (req: express.Request, res: express.Response) => {
    const { authorization } = req.headers;
    const bearer = authorization.split(' ');
    const token = bearer[1];

    try {
        res.status(200).send({hello: 'world'});
    } catch(e) {
        res.status(404).send(e.message);
    }
});