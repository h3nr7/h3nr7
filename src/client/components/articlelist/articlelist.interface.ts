import { IArticles, IArticle } from '../../../shared/interfaces/articles.interface';

export type IItemProps = IArticle & {
    key: any
    state: string
    count: number
};
export type IProps = IArticles & {
    filter: string
};