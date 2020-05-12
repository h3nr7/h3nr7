import * as React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import { SocialTags } from '../../components/socialtags';
import { useOneArticle } from '../../helper';
import { ArticleContainer } from './article.interface';

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
            <Typography variant='h3'>{article.title}</Typography>
        </ArticleContainer>
    )
}