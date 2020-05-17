import * as React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import { Grid } from '@material-ui/core';

import { RichText } from '../../components/richtext';
import { SocialTags } from '../../components/socialtags';
import { useOneArticle } from '../../helper/apiHooks';

import { 
    ArticleContainer, HeroImg, HeroGrid, TitleGrid, LinkTypo,
    HeaderGrid, ContentGrid, Desc, FooterGrid } from './article.styles';


export const Article = () => {

    const [ isLoaded, setIsLoaded ] = React.useState(false);
    const { id } = useParams();
    const article = useOneArticle(id);


    React.useEffect(() => {
        console.log('Received articles: ', article);
        setIsLoaded(true);
    }, [article]);

    return (
        <ArticleContainer>
            <SocialTags 
            id={id} 
            url={window.location.href}
            title={article.title} 
            description={article.description}
            twitterHandle='@_h3nr7'
            image={`http:${article.heroImage && article.heroImage.url}`}
            imageSecure={`https:${article.heroImage && article.heroImage.url}`} />
            <HeaderGrid container>
                <HeroGrid item xs={11} sm={11} md={8}>
                    {article.heroImage ? <HeroImg src={article.heroImage.url} /> : null}
                </HeroGrid>
                <TitleGrid item sm={12} md={3}>
                    <Typography variant='h3'>{article.title}</Typography>
                    {  article.linkUrl && 
                        <LinkTypo variant="h4">
                            <a href={article.linkUrl} target="_blank">
                                {String(article.linkUrl).replace(/^(https?|ftp):\/\//, '')}
                            </a>
                        </LinkTypo> 
                    }
                </TitleGrid> 
            </HeaderGrid>
            <ContentGrid>
                <Grid item sm={12} md={6}>
                    <Desc variant="h5">{article.description}</Desc>
                    {article.content ? <RichText document={article.content} /> : null}
                    <Typography variant="body2">
                        {`${String(article.articleType.title).toUpperCase()} - Updated on ${
                            (new Date(article.updatedAt)).toLocaleDateString("en-GB", {  
                                // weekday: 'long',
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                            })
                        }`}
                    </Typography>
                </Grid>
                <Grid item sm={12} md={8}>
                    
                </Grid>
            </ContentGrid>
            <FooterGrid>

            </FooterGrid>
        </ArticleContainer>
    )
}