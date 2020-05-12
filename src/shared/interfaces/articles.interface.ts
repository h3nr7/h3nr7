import { IImage } from './images.interface';
import { ITopic } from './topics.interface';
import { IPdf } from './pdfs.interface';
import { EntryFields  } from 'contentful';

/**
 * Local article interface
 */
export interface IArticle {
    id: string;
    title: string;
    description: string;
    content: EntryFields.RichText;
    showInHome?: boolean;
    createdAt: string;
    updatedAt: string;
    pageType: Array<string>;
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
    assets: Array<IImage | IPdf | null>;
}