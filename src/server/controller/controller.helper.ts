import { IArticles, IArticle } from '../../shared/interfaces/articles'
import { IImage } from '../../shared/interfaces/images';
import { ITopic } from '../../shared/interfaces/topics';
import { IPdf } from '../../shared/interfaces/pdfs';


/**
 * transform asses response to correct interface
 * @param res 
 */
export const transformArticlesResponse =  (res:any):IArticles => ({
    total: res.total,
    skip: res.skip,
    limit: res.limit,
    items: res.items.map((item:any):any => ({
        id: String(item.sys.id), 
        createdAt: String(item.sys.createdAt), 
        updatedAt: String(item.sys.updatedAt), 
        title: item.fields.title, 
        description: item.fields.description, 
        isPage: item.fields.isPage,
        heroImage: {
            title: item.fields.heroImage.fields.title,
            url: item.fields.heroImage.fields.file.url, 
            fileName: item.fields.heroImage.fields.file.fileName, 
            details: item.fields.heroImage.fields.file.details, 
            contentType: item.fields.heroImage.fields.file.contentType
        },
        topics: item.fields.topic.map((topicItem:any):ITopic => ({
            // id: topicItem.sys.id,
            title: topicItem.fields.title,
            // createdAt: topicItem.sys.createdAt,
            // updatedAt: topicItem.sys.updatedAt
        }))
    })),
    assets: res.includes.Asset.map((assetItem:any):IImage | IPdf => ({
        title: assetItem.fields.title,
        url: assetItem.fields.file.url,
        fileName: assetItem.fields.file.fileName,
        details: assetItem.fields.file.details,
        contentType: assetItem.fields.file.contentType
    }))
});