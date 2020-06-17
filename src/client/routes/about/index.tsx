import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Link } from './about.styles';
import { Typography } from '@material-ui/core';
import { RestrictedRoute } from '../restricted.routes';
import { Me } from './me';
import { CV } from './cv';

export const About:React.FC<{}> = () => {

    return (
        <div>
            <Typography variant='h4'>about</Typography> 
            <Link to='/about/me'>Me</Link>

            <Switch>
                <Route path="/about/me" component={Me} />
                {/* <RestrictedRoute path="/about/cv" component={CV} /> */}
                
                <Route path="/about/cv" component={CV} /> 
            </Switch>
        </div>
        
    );
}