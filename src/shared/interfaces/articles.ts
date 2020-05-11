import { IImage } from './images';
import { ITopic } from './topics';
import { IPdf } from './pdfs';

export interface IArticle {
    id: string;
    title: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    isPage: boolean;
    heroImage: IImage | null;
    topics: Array<ITopic>
}

export interface IArticles {
    total: number;
    skip: number;
    limit: number;
    items: Array<IArticle>;
    assets: Array<IImage | IPdf | null>;
}