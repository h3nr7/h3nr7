import * as express from 'express';
import { contentfulService } from '../service/contentful.service';
import { transformArticlesResponse, transformOneArticleResponse } from './controller.helper';

export const contentController = express.Router();

contentController.get('/articles/:id', async(req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const resData = await contentfulService.getOneArticle(String(id));
        res.status(200).send(transformOneArticleResponse(resData));
    } catch(e) {
        res.status(404).send(e.message);
    }
})

contentController.get('/articles', async (req: express.Request, res: express.Response) => {
    try {
        const { limit=10, skip=0, order='-sys.updatedAt' } = req.query;
        const resData = await contentfulService.getArticles(Number(limit), Number(skip), String(order)); 
        res.status(200).send(transformArticlesResponse(resData));
    } catch(e) {
        res.status(404).send(e.message);
    }
});