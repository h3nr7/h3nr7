import * as express from 'express';
import { contentfulService } from '../service/contentful.service';
import { 
    transformArticlesResponse, 
    transformOneArticleResponse,
    transformTopicsResponse,
    transformCVResponse,
    transformOneCvResponse
} from './controller.helper';
import content from '*.svg';
import { checkToken } from '../middleware/checktoken.middleware';

export const contentController = express.Router();

/**
 * Get single article by id from contentful
 */
contentController.get('/articles/:id', async(req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        // getting the articles and topics 
        const resArticleType = await contentfulService.getArticleTypes(1000, 0);
        const resTopic = await contentfulService.getTopics(1000, 0);
        // get one article
        const resData = await contentfulService.getOneEntry(String(id));
        // transform and flattening response
        res.status(200).send(transformOneArticleResponse(resData, resArticleType, resTopic));
    } catch(e) {
        res.status(404).send(e.message);
    }
})

/** 
 * getting a list of articles 
 */
contentController.get('/articles', async (req: express.Request, res: express.Response) => {
    try {
        const { limit=10, skip=0, order='-sys.updatedAt', home } = req.query;
        // default Ordering
        const outOrder = ['-fields.rankOrder', order].join(',');

        const resData = await contentfulService.getArticles(
            Number(limit), 
            Number(skip), 
            String(outOrder), 
            home ? Boolean(home==='true') : undefined
        ); 
        res.status(200).send(transformArticlesResponse(resData));
    } catch(e) {
        res.status(404).send(e.message);
    }
});

/**
 * getting just the article types
 */
contentController.get('/articletypes', async (req:express.Request, res: express.Response) => {
    try {
        const resData = await contentfulService.getArticleTypes(1000, 0);
        res.status(200).send(transformTopicsResponse(resData));
    } catch(e) {
        res.status(404).send(e.message);
    }
})

/**
 * getting all the topics
 */
contentController.get('/topics', async (req:express.Request, res: express.Response) => {
    try {
        const resData = await contentfulService.getTopics(1000, 0);
        res.status(200).send(transformTopicsResponse(resData));
    } catch(e) {
        res.status(404).send(e.message);
    }
})

/**
 * get single cv entry
 */
contentController.get('/cvs/:id', checkToken(false), async (req:express.Request, res:express.Response) => {
    try {
        const { token } = req.params;
        const { id } = req.params;
        const resData = await contentfulService.getOneEntry(id);
        res.status(200).send(transformOneCvResponse(resData));

    } catch(e) {
        res.status(404).send(e.message);
    }
})

/**
 * get cv list
 */
contentController.get('/cvs', async (req:express.Request, res:express.Response) => {
    try {
        const resData = await contentfulService.getCVs(10, 0);
        res.status(200).send(transformCVResponse(resData));
    } catch(e) {
        res.status(404).send(e.message);
    }
})