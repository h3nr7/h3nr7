import * as express from 'express';
import { BanquetteamModel } from '../model/banquetteam.model';

export const banquetController = express.Router();


/**
 * POST to add or update team
 */
banquetController.post(
    "/teams",
    async (req: express.Request, res: express.Response) => {
        const { 
            name,
            contact,
            totDistance,
            totElevation,
            totTime 
        } = req.body

        try {
            const team = await BanquetteamModel.findOneAndUpdate({ name }, {
                name,
                contact,
                totDistance,
                totElevation,
                totTime
            });
            res.status(200).send(team);
        } catch(e) {
            res.status(404).send(e.message);
        }
    }
)

/**
 * GET teams list
 */
banquetController.get(
    "/teams",
    async (req: express.Request, res: express.Response) => {
        try {
            const team = await BanquetteamModel.find();
            res.status(200).send(team);
        } catch(e) {
            res.status(404).send(e.message);
        }
    }
);


