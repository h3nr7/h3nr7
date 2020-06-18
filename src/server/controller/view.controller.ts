import * as express from 'express';
import * as path from 'path';
import * as loadjsonfile from "load-json-file";
import { contentfulService } from '../service/contentful.service';
import { IArticle } from '../../shared/interfaces/articles.interface';
import { transformOneArticleResponse, transformHtmlMetaResponse } from './controller.helper';
import { IArticleHtmlMetatags } from '../../shared/interfaces/https.interface';
export const viewController = express.Router();

// constant vars from ENVIRONMENT
const isDevMode = process.env.NODE_ENV === "development" || false;
const isProdMode = process.env.NODE_ENV === "production" || false;
const GA_ID = process.env.GA_ID || null;
const FB_ID = process.env.FB_ID || null;
const TYPEKIT_ID = process.env.TYPEKIT_ID || null;
const TWITTER_PIXEL_ID = process.env.TWITTER_PIXEL_ID || null;
const TWITTER_ID = process.env.TWITTER_ID || null;
const DEFAULT_IMAGE = process.env.DEFAULT_IMAGE || null;
const DEFAULT_TITLE = process.env.DEFAULT_TITLE || null;
const DEFAULT_DESC = process.env.DEFAULT_DESC || null;


let webpackManifest: any = {};
if (isProdMode) {
    webpackManifest = loadjsonfile.sync(path.resolve(__dirname, "..", "..", "dist", "manifest.json"));
}

// common vars
const vendorsJSUrl:string = isProdMode ? webpackManifest["vendors.js"] : '/dist/vendors.bundle.js';
const bundleJSUrl:string = isProdMode ? webpackManifest["main.js"] : '/dist/bundle.js';
const twitterHandle:string = TWITTER_ID;
const fbId:string = FB_ID;
const gaId: string = GA_ID;
const typekitId:string = TYPEKIT_ID;
const twitterPixelId:string = TWITTER_PIXEL_ID

/** individual article view, fetched article details, may need to cache it in the future for performance sake */
viewController.get('/article/:id', async (req:express.Request, res:express.Response) => {
    
    try {
        const { id } = req.params;
        // getting the articles and topics 
        const resArticleType = await contentfulService.getArticleTypes(1000, 0);
        const resTopic = await contentfulService.getTopics(1000, 0);
        // get one article
        const resData = await contentfulService.getOneArticle(String(id));
        const article:IArticle = transformOneArticleResponse(resData, resArticleType, resTopic);
        const metatags:IArticleHtmlMetatags = transformHtmlMetaResponse({
            ...article, 
            twitterHandle, 
            type: 'website',
            protocol: req.protocol,
            host: req.hostname,
            port: req.socket.localPort,
            url: req.originalUrl });
        
        let hbsData:any = {
            layout: 'default',
            title:  article.title,
            typekitId,
            vendorsJSUrl,
            bundleJSUrl
        };

        // only show all the tracking and meta in prod
        if(isProdMode) {
            hbsData = {
                ...hbsData, 
                gaId,
                fbId,
                twitterPixelId,
                metatags
            };
        }

        res.render('home', hbsData);
    } catch(e) {
        res.status(404).send(e.message);
    }
});

// default views
viewController.use((req: express.Request, res: express.Response) => {
    
    const title:string = DEFAULT_TITLE;
    const metatags = {
        title,
        desc: DEFAULT_DESC,
        type: 'website',
        image: `http://${req.host}${isDevMode && req.socket.localPort ? `:${req.socket.localPort}` : ''}/${DEFAULT_IMAGE}`,
        imageSecure: `https://${req.host}${isDevMode && req.socket.localPort ? `:${req.socket.localPort}` : ''}/${DEFAULT_IMAGE}`,
        url:`${req.protocol}://${req.host}${isDevMode && req.socket.localPort ? `:${req.socket.localPort}` : ''}${req.originalUrl}`
    };

    let hbsData:any = {
        layout: 'default',
        title,
        typekitId,
        vendorsJSUrl,
        bundleJSUrl
    };

    // only show all the tracking and meta in prod
    if(isProdMode) {
        hbsData = {
            ...hbsData, 
            gaId,
            fbId,
            twitterPixelId,
            metatags
        };
    }
    
    res.render('home', hbsData);
});

