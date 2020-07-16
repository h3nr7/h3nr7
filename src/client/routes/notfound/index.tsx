import * as React from 'react';
import { hot } from 'react-hot-loader';
import { Container, SimpleLink } from '../../styles/common.styles';
import { Typography } from '@material-ui/core';

const NotFoundComp = () => {
    return (
        <Container>
            <Typography variant='h3'>: - / Oops...</Typography>
            <Typography style={{ marginTop: '2rem' }} variant='h6'>
                😐 Page not found. However if you think this is an error, please feel free 
                to contact me via one of the methods 
                in <SimpleLink to="/about">about page</SimpleLink>.
            </Typography>
        </Container>

    )
}

export const NotFound = hot(module)(NotFoundComp)