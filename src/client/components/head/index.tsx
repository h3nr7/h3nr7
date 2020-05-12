import * as React from 'react';
import { hot } from 'react-hot-loader';

import { IHead } from './head.interface';
import { Typography } from '@material-ui/core';

import { HeadContainer, Logo } from './head.styles'

const HeadComp:React.StatelessComponent<IHead> = () => {

    return (
        <HeadContainer>
            <Typography variant='h5'>
                <Logo to='/'>h3nr7</Logo> / Project / Post / Info
            </Typography>
            {/* <Typography variant='h1'>Contact</Typography> */}
        </HeadContainer>
    );
}

export const Head = hot(module)(HeadComp);


