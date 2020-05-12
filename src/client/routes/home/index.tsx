import * as React from 'react';
import { hot } from 'react-hot-loader';

import { useArticles } from '../../helper';
import { IHome } from './home.interface';
import { LoadingDiv } from './home.styles';
import { ArticleList } from '../../components/articlelist';

const HomeComp:React.FunctionComponent<IHome> = () => {
    const [ page, setPage ] = React.useState(0);
    const [ isLoaded, setIsLoaded ] = React.useState(false);
    const articles = useArticles(10, page);

    React.useEffect(() => {
        console.log('Received articles: ', articles);
        setIsLoaded(true);
    }, [articles]);

    return isLoaded ? (
        <ArticleList {...articles} />
    ) : <LoadingDiv />;
}

export const Home = hot(module)(HomeComp);