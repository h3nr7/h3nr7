import * as contentful from 'contentful';
import { EventEmitter } from 'events';

import { IContentfulEntries, IContentfulArticle } from '../../shared/interfaces/contentful.interface';

const CONTENTFUL_SPACE = process.env.CONTENTFUL_SPACE;
const CONTENTFUL_ENV = process.env.CONTENTFUL_ENV;
const CONTENTFUL_ACCESS_TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN;

export interface IContentfulService {
    client: contentful.ContentfulClientApi
};

class ContentfulService extends EventEmitter implements IContentfulService {

    client = contentful.createClient({
        space: CONTENTFUL_SPACE,
        environment: CONTENTFUL_ENV,
        accessToken: CONTENTFUL_ACCESS_TOKEN
    });

    /** get topics */
    getTopic(limit:number, skip:number):Promise<IContentfulEntries> {
        return this.client.getEntries({
            content_type: 'topic',
            limit, skip
        }); 
    }

    /** get articles */
    getArticles(limit:number, skip: number):Promise<IContentfulEntries> {
        return this.client.getEntries({
            content_type: 'article',
            limit, skip
        });
    }

    /** get asset */
    getAsset(assetId:string) {
        return this.client.getAsset(assetId);
    }

}

export const contentfulService = new ContentfulService();

