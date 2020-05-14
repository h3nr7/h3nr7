import * as React from 'react';
import { hot } from 'react-hot-loader';
import { useLocation, useRouteMatch } from 'react-router-dom';

import { IHead } from './head.interface';
import { Typography } from '@material-ui/core';

import { HeadContainer, Logo, ArrowImg } from './head.styles'
import SVG from 'react-inlinesvg';
import arrowSrc from '../../assets/left_arrow.svg';



const HeadComp:React.StatelessComponent<IHead> = () => {

    let { pathname, search, key, state} = useLocation();
    let { path, url, isExact, params } = useRouteMatch();
    console.log(path, url, isExact, params);
    console.log(pathname, search, key, state);
    console.log(arrowSrc);
    return (
        <HeadContainer>
            <SVG src={arrowSrc} />
                <Typography variant='h5'>
                    <Logo to='/'>h3nr7</Logo>
                </Typography>
        </HeadContainer>
    );
}

export const Head = hot(module)(HeadComp);


