import * as express from 'express';
import { contentfulService } from '../service/contentful.service';
import { transformArticlesResponse } from './controller.helper';

export const contentController = express.Router();

contentController.get('/articles', async (req: express.Request, res: express.Response) => {
    try {
        const { limit=10, skip=0 } = req.query;
        const resData = await contentfulService.getArticles(Number(limit), Number(skip)); 
        res.status(200).send(transformArticlesResponse(resData));
    } catch(e) {
        res.status(404).send(e.message);
    }
});