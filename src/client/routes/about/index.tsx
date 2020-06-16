import * as React from 'react';
import { Link } from './about.styles';
import { Typography } from '@material-ui/core';

export const About:React.FC<{}> = () => {

    return (
        <div>
            <Typography variant='h4'>about</Typography> 
            <Link to='/about/me'>Me</Link>
        </div>
        
    );
}