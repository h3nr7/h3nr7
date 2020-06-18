import * as express from 'express';
import { IArticles, IArticle, IArticleTypes, IArticleType } from '../../shared/interfaces/articles.interface'
import { IImage } from '../../shared/interfaces/images.interface';
import { ITopics } from '../../shared/interfaces/topics.interface';
import { IPdf } from '../../shared/interfaces/pdfs.interface';
import { 
    IContentfulEntries, IContentfulEntry, 
    IContentfulArticleType, IContentfulTopic 
} from '../../shared/interfaces/contentful.interface';
import { IArticleHtmlMetatags } from '../../shared/interfaces/https.interface'
import * as mailerData from '../settings/mailer.settings.json';
import { EntryCollection } from 'contentful';
import { emailer, IEmailer } from '../lib/emailer';

const isDevMode = process.env.NODE_ENV === "development" || false;
const defaultImage:string = process.env.DEFAULT_IMAGE;

/**
 * transform one article from contentful structure 
 * to something meaningful on our end 
 * very complex mapper... 
 * */
export const transformOneArticleResponse = (
    {
        sys: { id, createdAt, updatedAt },
        fields: { 
            title, description, articleType, 
            heroImage, topic, showInHome, 
            content, markdownContent, rankOrder, isArchived,
            linkUrl
        }
    }:IContentfulEntry,
    articleTypeDict:EntryCollection<IContentfulArticleType>, 
    topicDict:EntryCollection<IContentfulTopic>
):IArticle => ({
    id, title, description, createdAt, updatedAt, 
    showInHome, content, 
    markdownContent: markdownContent && {
        title: markdownContent.fields.title,
        url: markdownContent.fields.file.url,
        fileName: markdownContent.fields.file.fileName, 
        details: markdownContent.fields.file.details,
        contentType: markdownContent.fields.file.contentType
    },
    rankOrder, isArchived, linkUrl,
    heroImage: heroImage && {
        title: heroImage.fields.title,
        url: heroImage.fields.file.url,
        fileName: heroImage.fields.file.fileName, 
        details: heroImage.fields.file.details,
        contentType: heroImage.fields.file.contentType
    },
    articleType: {
        id: articleType.sys.id,
        title: articleTypeDict.items.find(obj => obj.sys.id === articleType.sys.id).fields.title
    },
    topics: topic && topic.map(({ sys }) => ({
        id: sys.id,
        title: topicDict.items.find(obj => obj.sys.id === sys.id).fields.title
    }))
});

/**
 * Convert all articles properly with typings
 */
export const transformArticlesResponse = ({ 
    total, skip, limit, items, includes
 }:IContentfulEntries):IArticles => ({
    total, skip, limit,
    items: items && items.map(({ 
        sys: { id, createdAt, updatedAt }, fields:{ 
            title, description, articleType, 
            heroImage, showInHome, topic, 
            content, markdownContent, rankOrder, isArchived, linkUrl
        } 
    }) => ({
        id, createdAt, updatedAt,
        title, description,
        showInHome, content, 
        markdownContent: markdownContent && {
            title: markdownContent.fields.title,
            url: markdownContent.fields.file.url,
            fileName: markdownContent.fields.file.fileName,
            details: markdownContent.fields.file.details,
            contentType: markdownContent.fields.file.contentType

        },
        rankOrder, isArchived, linkUrl,
        heroImage: heroImage && {
            title: heroImage.fields.title,
            url: heroImage.fields.file.url,
            fileName: heroImage.fields.file.fileName,
            details: heroImage.fields.file.details,
            contentType: heroImage.fields.file.contentType
        },
        articleType: {
            id: articleType.sys.id
        },
        topics: topic && topic.map(({ sys }) => ({
            id: sys.id
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

/**
 * format html meta response from data received
 */
export const transformHtmlMetaResponse = ({
    id, title, description, heroImage, twitterHandle, url, protocol, host, port, type
}:IArticle & { type: string, twitterHandle:string, url:string, protocol: string, host:string, port:number }):IArticleHtmlMetatags => ({
    id, title, type, 
    description,
    image: `http:${heroImage ? heroImage.url : defaultImage}`,
    imageSecure: `https:${heroImage ? heroImage.url : defaultImage}`,
    url:`${protocol}://${host}${isDevMode && port && port !== 80 ? `:${port}` : ''}${url}`,
    twitterHandle
});

/** 
 * transform list of topics 
 */
export const transformArticleTypeResponse = ({ 
    total, skip, limit, items 
}:IContentfulEntries):IArticleTypes => ({
    total, skip, limit,
    items: items && items && items.map(({
        sys: { id, createdAt, updatedAt }, fields:{ 
            title
        }
    }) => ({
        id, title, createdAt, updatedAt
    }))
})

/** 
 * transform list of topics 
 */
export const transformTopicsResponse = ({ 
    total, skip, limit, items 
}:IContentfulEntries):ITopics => ({
    total, skip, limit,
    items: items && items && items.map(({
        sys: { id, createdAt, updatedAt }, fields:{ 
            title
        }
    }) => ({
        id, title, createdAt, updatedAt
    }))
})

export const sendRequestCvEmail = (
    email: string,
    firstName:string,
    lastName: string,
    token: string,
    content?: string
):Promise<IEmailer> => {
    const { from, subject, templateName, text } = mailerData.requestCv.verification;
    return emailer({
        to: email,
        from,
        subject,
        templateName,
        text,
        data: {
            firstName,
            token,
            content
        }
    });
}