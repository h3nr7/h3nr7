import * as React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { SocialTags } from '../../components/socialtags';
import { useOneArticle } from '../../helper';
import RichTextToReact from 'rich-text-to-react';
import { 
    ArticleContainer, HeroImg, HeroGrid, TitleGrid, 
    HeaderGrid, ContentGrid, Desc } from './article.styles';
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
            image={`https:${article.heroImage && article.heroImage.url}`} />
            <HeaderGrid container>
                <HeroGrid item sm={12} md={8}>
                    {article.heroImage ? <HeroImg src={article.heroImage.url} /> : null}
                </HeroGrid>
                <TitleGrid item sm={12} md={4}>
                    <Typography variant='h3'>{article.title}</Typography>
                </TitleGrid> 
            </HeaderGrid>
            <ContentGrid>
                <Grid item sm={12} md={6}>
                    <Desc variant="h5">{article.description}</Desc>
                    {article.content ? <RichTextToReact document={article.content} /> : null}
                </Grid>
                <Grid item sm={12} md={8}>
                    
                </Grid>
            </ContentGrid>
        </ArticleContainer>
    )
}