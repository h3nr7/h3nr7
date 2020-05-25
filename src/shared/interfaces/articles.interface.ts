import { IImage } from './images.interface';
import { ITopic } from './topics.interface';
import { IPdf } from './pdfs.interface';
import { IMarkdown } from './markdowns.interface';
import { EntryFields  } from 'contentful';


export interface IArticleType {
    id: string;
    title?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface IArticleTypes {
    total: number;
    skip: number;
    limit: number;
    items: Array<IArticleType>;
}

export interface IAsset {
    id: string;
    title: string;
    description: string;

}

/**
 * Local article interface
 */
export interface IArticle {
    id: string;
    title: string;
    description: string;
    content: EntryFields.RichText;
    markdownContent?: IMarkdown | null,
    showInHome?: boolean;
    isArchived?: boolean;
    linkUrl?: string;
    createdAt: string;
    updatedAt: string;
    articleType: IArticleType;
    rankOrder?: number,
    heroImage: IImage | null;
    topics: Array<ITopic> | null;
}

/**
 * Local article list interface
 */
export interface IArticles {
    total: number;
    skip: number;
    limit: number;
    items: Array<IArticle>;
    assets: Array<IImage | IPdf | IMarkdown | null>;
}