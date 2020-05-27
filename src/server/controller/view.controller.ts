import * as express from 'express';
import * as path from 'path';
import * as loadjsonfile from "load-json-file";
export const viewController = express.Router();

const isDevMode = process.env.NODE_ENV === "development" || false;
const isProdMode = process.env.NODE_ENV === "production" || false;
const GA_ID = process.env.GA_ID || null;
const FB_ID = process.env.FB_ID || null;
const TYPEKIT_ID = process.env.TYPEKIT_ID || null;
const TWITTER_PIXEL_ID = process.env.TWITTER_PIXEL_ID || null;

let webpackManifest: any = {};
if (isProdMode) {
    webpackManifest = loadjsonfile.sync(path.resolve(__dirname, "..", "..", "dist", "manifest.json"));
}

// default views
viewController.use((req: express.Request, res: express.Response) => {
    const vendorsJSUrl:string = isProdMode ? webpackManifest["vendors.js"] : '/dist/vendors.bundle.js';
    const bundleJSUrl:string = isProdMode ? webpackManifest["main.js"] : '/dist/bundle.js';
    const title:string = 'h3nr7 :: A creative coder\'s journal';
    const fbId:string = FB_ID;
    const gaId: string = GA_ID;
    const typekitId:string = TYPEKIT_ID;
    const twitterPixelId:string = TWITTER_PIXEL_ID

    const og = {
        title,
        desc: 'some desc',
        image: 'some image',
        type: 'some type'
    };

    res.render('home', { 
        layout: 'default',
        title,
        gaId,
        fbId,
        typekitId,
        twitterPixelId,
        og,
        vendorsJSUrl,
        bundleJSUrl
    });
});

