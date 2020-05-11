import * as axios from 'axios';
import { IArticles } from '../../shared/interfaces/articles';
import { IImage } from '../../shared/interfaces/images';
import { IPdf } from '../../shared/interfaces/pdfs';

export const getArticles = (limit:string, skip: string):Promise<IArticles> => {
    return axios.default.get(`/api/content/articles`, 
        {params: { limit, skip }
    }).then(res => res.data);
}

export const getAsset = (assetId:string):Promise<IImage | IPdf> => {
    return axios.default.get(`/api/content/assets/${assetId}`).then(res=> res.data);
}