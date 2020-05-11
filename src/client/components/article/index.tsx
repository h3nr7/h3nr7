import * as React from 'react';

import { IProps } from './article.interface';
import { ArticleList, ArticleItem } from './article.styles';

export const Article:React.StatelessComponent<IProps> = ({ items, ...rest }) => {

    return (
        <ArticleList>
            {items.map((item:any) => (
                <ArticleItem key={item.id}>
                    {JSON.stringify(item)}
                </ArticleItem>
            ))}
        </ArticleList>
    )
}