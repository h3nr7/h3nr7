import * as axios from 'axios';
import { IArticles, IArticle, IArticleTypes } from '../../shared/interfaces/articles.interface';
import { ITopics } from '../../shared/interfaces/topics.interface';
import { IImage } from '../../shared/interfaces/images.interface';
import { IPdf } from '../../shared/interfaces/pdfs.interface';
import { IUser } from '../../shared/interfaces/user.interface';
import { ICV } from '../../shared/interfaces/cvs.interface';

/** get single article */
export const getOneEntry = (id:string):Promise<IArticle> => {
    return axios.default.get(`/api/content/articles/${id}`)
        .then(res => res.data);
}

/** get list of articles */
export const getArticles = (limit:string, skip: string, home?: boolean):Promise<IArticles> => {
    return axios.default.get(`/api/content/articles`, 
        {params: { limit, skip, home }
    }).then(res => res.data);
}

/** get all article types */
export const getArticleTypes = ():Promise<IArticleTypes> => {
    return axios.default.get(`/api/content/articletypes`)
        .then(res=>res.data);
}

/** get all topics */
export const getTopics = ():Promise<ITopics> => {
    return axios.default.get(`/api/content/topics`)
        .then(res=>res.data);
}

export const getCV = (id:string, token:string):Promise<ICV> => {
    const config:axios.AxiosRequestConfig = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    return axios.default.get(`/api/content/cvs/${id}`, config).then(res => res.data);
}

/** get assets */
export const getAsset = (assetId:string):Promise<IImage | IPdf> => {
    return axios.default.get(`/api/content/assets/${assetId}`).then(res=> res.data);
}

export const getTokenUser = (token:string): Promise<any> => {
    const config:axios.AxiosRequestConfig = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    return axios.default.get(`/api/user/me`, config).then(res => res.data);
}

export const getLinkedinMe = (token:string):Promise<IUser> => {
    const config:axios.AxiosRequestConfig = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    return axios.default.get(`/api/users/me`, config).then(res => res.data);

};