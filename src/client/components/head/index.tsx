import * as React from 'react';
import { hot } from 'react-hot-loader';

import { IHead } from './head.interface';
import { Typography } from '@material-ui/core';

const HeadComp:React.StatelessComponent<IHead> = () => {

    return (
        <div>
            <Typography variant='h2'>h3nr7</Typography>
            <Typography variant='h1'>Contact</Typography>
        </div>
    );
}

export const Head = hot(module)(HeadComp);


