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
                        Sometimes referred to as a technologist, most times a developer.  
                        I am driven by the process of problem solving and innovation.  Having worked across industries
                        from advertising and creative agencies to banking and fintech, I have led teams building service applications 
                        with different requirements and infrastructures, designed end-to-end solutions and developed rapid prototypes 
                        to validate ideas and concepts. 
                    </Paragraph>
                    <Paragraph variant="body2">
                        Other than working,  I enjoy geeking out in my home workshop, training for triathlons or playing recreational basketball.
                    </Paragraph>
                    <Paragraph variant="body2">
                        For any enquiries, please feel free to get in touch via links below. ❌📧📞
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