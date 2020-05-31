import * as React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { Markdown } from '../../components/markdown';
import { RichText } from '../../components/richtext';
import { SocialTags } from '../../components/socialtags';
import { useOneArticle } from '../../helper/apiHooks';

import { 
    ArticleContainer, HeroImg, HeroGrid, TitleGrid, LinkTypo,
    HeaderGrid, ContentGrid, Desc, FooterGrid, BackBut } from './article.styles';
import { Transition } from 'react-transition-group';


export const Article = () => {

    const [ isLoaded, setIsLoaded ] = React.useState(false);
    const history = useHistory();
    const { id } = useParams();
    const article = useOneArticle(id);


    React.useEffect(() => {
        setIsLoaded(true);
        return () => setIsLoaded(false);
    }, [article, id]);

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
                    <Transition in={isLoaded} timeout={500}>
                    {(state) => (
                        <BackBut onClick={() => history.goBack()} state={state}>
                            <Typography variant='h5'>back &#8636;</Typography>
                        </BackBut>
                    )}
                    </Transition>
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
                    {article.markdownContent ? <Markdown markdownContent={article.markdownContent} /> : null}
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