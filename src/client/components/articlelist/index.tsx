import * as React from 'react';
import { IProps, IItemProps } from './articlelist.interface';
import { Ul, Li, Link, Desc } from './articlelist.styles';
import { Typography } from '@material-ui/core';

const ArticleListItem:React.StatelessComponent<IItemProps> = ({title, description, id, ...rest}) => {
    return (
        <Li><Link to={`/article/${id}`}>
            <Typography variant="h3">{title}</Typography>
            <Desc variant="h6">{description}</Desc>
        </Link></Li>
    )
}

export const ArticleList:React.StatelessComponent<IProps> = ({ items, ...rest }) => {

    return (
        <Ul>
            {items.map((item:any) => (
                <ArticleListItem key={item.id} {...item} />
            ))}
        </Ul>
    )
}