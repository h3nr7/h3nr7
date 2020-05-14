import { IArticles, IArticle } from '../../../shared/interfaces/articles.interface';

export type IItemProps = IArticle & {
    key: any
};
export type IProps = IArticles & {
    filter: string
};