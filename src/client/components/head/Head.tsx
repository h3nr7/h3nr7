import * as React from 'react';
import { useLocation, useRouteMatch } from 'react-router-dom';

import { IHead } from './head.interface';
import { Typography } from '@material-ui/core';

import { HeadContainer, Logo, ArrowImg } from './head.styles'
import arrowSrc from '../../assets/left_arrow.svg';



export const HeadComp:React.FC<IHead> = () => {

    let { pathname, search, key, state} = useLocation();
    let { path, url, isExact, params } = useRouteMatch();
    console.log(path, url, isExact, params);
    console.log(pathname, search, key, state);
    return (
        <HeadContainer>
            <ArrowImg src={arrowSrc} />
                <Typography variant='h5'>
                    <Logo to='/'>h3nr7</Logo>
                </Typography>
        </HeadContainer>
    );
}



