import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Link } from './about.styles';
import { Typography, Grid } from '@material-ui/core';
// import { RestrictedRoute } from '../restricted.routes';
import { Me } from './me';
import { Container, Section, Paragraph } from '../../styles/common.styles';

export const About:React.FC<{}> = () => {

    return (
        <Container>
            <Typography variant='h5'>Henry yp ho</Typography> 
            <Typography variant='body2'>Creative Tinkerer</Typography>
            <Section container>
                <Grid item sm={12} md={6}>
                    <Paragraph variant="body2">
                        Sometimes referred to as a technologist, most times a fullstack, frontend or backend developer.  
                        I simply enjoy the process of problem solving and innovation.  Having worked in different industries
                        from advertising and creative agencies to banking and fintech, I have designed and built solutions 
                        for a range requirements and infrastructures, as well as rapid prototyping for validation of ideas and concepts. 
                    </Paragraph>
                    <Paragraph variant="body2">
                        I also enjoy cycling and triathlon, so feel free to hit me up on Strava!
                    </Paragraph>
                </Grid>
            </Section>
            <Switch>
                {/* <Route path="/about/me" component={Me} /> */}
                {/* <RestrictedRoute path="/about/cv" component={CV} /> */}                
            </Switch>
        </Container>
    );
}