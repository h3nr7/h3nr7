import * as axios from 'axios';
import { IArticles, IArticle } from '../../shared/interfaces/articles.interface';
import { IImage } from '../../shared/interfaces/images.interface';
import { IPdf } from '../../shared/interfaces/pdfs.interface';

/** get single article */
export const getOneArticle = (id:string):Promise<IArticle> => {
    return axios.default.get(`/api/content/articles/${id}`)
        .then(res => res.data);
}

/** get list of articles */
export const getArticles = (limit:string, skip: string, home?: boolean):Promise<IArticles> => {
    return axios.default.get(`/api/content/articles`, 
        {params: { limit, skip, home }
    }).then(res => res.data);
}

/** get assets */
export const getAsset = (assetId:string):Promise<IImage | IPdf> => {
    return axios.default.get(`/api/content/assets/${assetId}`).then(res=> res.data);
}