import * as React from 'react';
import { Transition } from 'react-transition-group';

import { useMediaDetect } from  '../../helper/mediaQueryHook';
import { IProps, IItemProps } from './articlelist.interface';
import { Ul, MobileLi, DesktopLi, Link, Desc } from './articlelist.styles';
import { Typography } from '@material-ui/core';
import { IArticle } from '../../../shared/interfaces/articles.interface';

/** each list item */
const ArticleListItem:React.FC<IItemProps> = ({title, description, id, state, count, ...rest}) => {
    const mediaType = useMediaDetect();
    const [ hasMouse, setHasMouse ] = React.useState(true);
    const Li = hasMouse ? DesktopLi : MobileLi;

    /** set and reload if it has mouse */
    React.useEffect(() => {
        setHasMouse(mediaType.hasMouse);
    }, [mediaType]);
    
    return (
        <Li count={count} state={state}><Link to={`/article/${id}`}>
            <Typography variant="h3">{title}</Typography>
            <Desc variant="h6">{description}</Desc>
        </Link></Li>
    )
}

export const ArticleList:React.StatelessComponent<IProps> = ({filter, items, ...rest }) => {
    return (
        <Ul>
            {items.map((item:IArticle, count: number) => {
                const isVisible = filter ? filter===item.articleType.id : true;
                return (
                    <Transition key={item.id} in={isVisible} timeout={500}>
                    {(state) => (
                        <ArticleListItem 
                            count={count}
                            state={state} 
                            key={`articlelistitem_${item.id}`} 
                            {...item} />
                    )}
                    </Transition>
                );
            })}
        </Ul>
    )
}