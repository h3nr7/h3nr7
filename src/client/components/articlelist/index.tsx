import * as React from 'react';
import { IProps, IItemProps } from './articlelist.interface';
import { Ul, Li, Link, Desc } from './articlelist.styles';
import { Typography } from '@material-ui/core';
import { IArticle } from '../../../shared/interfaces/articles.interface';

const ArticleListItem:React.StatelessComponent<IItemProps> = ({title, description, id, ...rest}) => {
    return (
        <Li><Link to={`/article/${id}`}>
            <Typography variant="h3">{title}</Typography>
            <Desc variant="h6">{description}</Desc>
        </Link></Li>
    )
}

export const ArticleList:React.StatelessComponent<IProps> = ({filter, items, ...rest }) => {

    return (
        <Ul>
            {items.map((item:IArticle) => {
                console.log(item.articleType, filter===item.articleType.id);
                return <ArticleListItem key={item.id} {...item} />
            })}
        </Ul>
    )
}