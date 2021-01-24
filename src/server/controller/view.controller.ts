import * as express from 'express';
import * as Moment from 'moment';
import * as path from 'path';
import * as loadjsonfile from "load-json-file";
import { contentfulService } from '../service/contentful.service';
import { IArticle } from '../../shared/interfaces/articles.interface';
import { transformOneArticleResponse, transformHtmlMetaResponse } from './helper/content.controller.helper';
import { IArticleHtmlMetatags } from '../../shared/interfaces/https.interface';
import { authRequired } from '../auth/strava.strategy';
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
const version = Moment().unix();
const vendorsJSUrl:string = isProdMode ? webpackManifest["vendors.js"] : `/dist/vendors.bundle.js?v=${version}`;
const bundleJSUrl:string = isProdMode ? webpackManifest["main.js"] : `/dist/bundle.js?v=${version}`;
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
        const resData = await contentfulService.getOneEntry(String(id));
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

async function StravaController(req:express.Request, res:express.Response) {
    const { profile, accessToken } = req?.user || {};
    const title:string = `h3nr7 :: Hello ${profile.firstname}, welcome to our Strava playground`;
    const metatags = {
        title,
        desc: `Strava Profile for all the fun experiments with your Strava Data`,
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

    if(accessToken) res.header({ Authorization: `bearer ${accessToken}` })
    res.render('home', hbsData);
}

// strava logged in view
viewController.get('/strava/profile',  authRequired, StravaController);
// viewController.get('/strava/banquet2021', authRequired, StravaController);

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
        bundleJSUrl,
        
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

