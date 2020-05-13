import { IArticles, IArticle } from '../../shared/interfaces/articles.interface'
import { IImage } from '../../shared/interfaces/images.interface';
import { ITopic } from '../../shared/interfaces/topics.interface';
import { IPdf } from '../../shared/interfaces/pdfs.interface';
import { IContentfulEntries, IContentfulEntry } from '../../shared/interfaces/contentful.interface';
import { Entry } from 'contentful';

export const transformOneArticleResponse = ({
    sys: { id, createdAt, updatedAt },
    fields: { 
        title, description, pageType, 
        heroImage, topic, showInHome, 
        content, rankOrder, isArchived
    }
}:IContentfulEntry):IArticle => ({
    id, title, description, createdAt, updatedAt, 
    pageType, showInHome, content, rankOrder, isArchived,
    heroImage: heroImage && {
        title: heroImage.fields.title,
        url: heroImage.fields.file.url,
        fileName: heroImage.fields.file.fileName, 
        details: heroImage.fields.file.details,
        contentType: heroImage.fields.file.contentType
    },
    topics: topic && topic.map(({ fields }) => ({
        title: fields.title
    }))
});

/**
 * Convert all articles properly with typings
 * @param param
 */
export const transformArticlesResponse = ({ 
    total, skip, limit, items, includes
 }:IContentfulEntries):IArticles => ({
    total, skip, limit,
    items: items && items.map(({ 
        sys: { id, createdAt, updatedAt }, fields:{ 
            title, description, pageType, 
            heroImage, showInHome, topic, 
            content, rankOrder, isArchived
        } 
    }) => ({
        id, createdAt, updatedAt,
        title, description, pageType, 
        showInHome, content, rankOrder, isArchived,
        heroImage: heroImage && {
            title: heroImage.fields.title,
            url: heroImage.fields.file.url,
            fileName: heroImage.fields.file.fileName,
            details: heroImage.fields.file.details,
            contentType: heroImage.fields.file.contentType
        },
        topics: topic && topic.map(({ fields }) => ({
            title: fields.title
        }))
    })),
    assets: includes && includes.Asset && includes.Asset.map(({ fields: { title, file } }):IImage | IPdf => ({
        title,
        url: file.url,
        fileName: file.fileName,
        details: file.details,
        contentType: file.contentType
    }))
})
