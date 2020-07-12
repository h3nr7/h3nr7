import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Link, SocialContainer, SocialLink } from './about.styles';
import { Typography, Grid } from '@material-ui/core';
// import { RestrictedRoute } from '../restricted.routes';
import { Me } from './me';
import { Container, Section, Paragraph } from '../../styles/common.styles';
import LinkedIn from './linkedin_icon.svg';
import Twitter from './twitter_icon.svg';
import Github from './github_icon.svg';
import Instagram from './instagram_icon.svg';

const LINKEDIN_SOCIAL_URL = process.env.LINKEDIN_SOCIAL_URL
const TWITTER_SOCIAL_URL = process.env.TWITTER_SOCIAL_URL
const INSTAGRAM_SOCIAL_URL = process.env.INSTAGRAM_SOCIAL_URL
const GITHUB_SOCIAL_URL = process.env.GITHUB_SOCIAL_URL

export const About:React.FC<{}> = () => {


    console.log(LINKEDIN_SOCIAL_URL,
        TWITTER_SOCIAL_URL,
        INSTAGRAM_SOCIAL_URL)

    return (
        <Container>
            <Typography variant='h5'>Henry yp ho</Typography> 
            <Typography variant='body2'>Creative Tinkerer</Typography>
            <Section container>
                <Grid item sm={12} md={6}>
                    <Paragraph variant="body2">
                        Sometimes referred to as technologist, otherwise a developer.  
                        Driven by the process of problem solving and innovation.  I have worked across industries
                        from creative agencies to banking and fintech, leading teams building applications 
                        with different requirements and infrastructures, designed end-to-end solutions and rapid prototyped 
                        for concept validations. 
                    </Paragraph>
                    <Paragraph variant="body2">
                        I enjoy spending time in my workshop, training for triathlon and playing basketball with a team of old man.
                    </Paragraph>
                    <Paragraph variant="body2">
                        For my basic CV please use <Link 
                        to={'/about/cv/request?cvid=6UrzkYkJ6z5mMzr9dWVdSj'}>this form
                        </Link> or get in touch via social media below, may be for a chat over coffee (virtually for now until it is safe to do so in person of course).
                    </Paragraph>
                </Grid>
            </Section>
            <SocialContainer>
                <SocialLink href={GITHUB_SOCIAL_URL} target="github" ><img src={Github} width={20} height={20} /></SocialLink>
                <SocialLink href={INSTAGRAM_SOCIAL_URL} target="instagram"><img src={Instagram} width={20} height={20} /></SocialLink>
                <SocialLink href={TWITTER_SOCIAL_URL} target="twitter" ><img src={Twitter} width={20} height={20} /></SocialLink>
                <SocialLink href={LINKEDIN_SOCIAL_URL} target="linkedin" ><img src={LinkedIn} width={20} height={20} /></SocialLink>
            </SocialContainer>
            <Switch>
                {/* <Route path="/about/me" component={Me} /> */}
                {/* <RestrictedRoute path="/about/cv" component={CV} /> */}                
            </Switch>
        </Container>
    );
}