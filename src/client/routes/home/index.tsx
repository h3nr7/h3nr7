import * as React from 'react';
import { hot } from 'react-hot-loader';

import { useArticles } from '../../helper';
import { IHome } from './home.interface';
import { LoadingDiv } from './home.styles';
import { Article } from '../../components/article';

const HomeComp:React.FunctionComponent<IHome> = () => {
    const [ page, setPage ] = React.useState(0);
    const [ isLoaded, setIsLoaded ] = React.useState(false);
    const articles = useArticles(10, page);

    React.useEffect(() => {
        console.log('Received articles: ', articles);
        setIsLoaded(true);
    }, [articles]);

    return isLoaded ? (
        <div>
            <Article {...articles} />
        </div>
    ) : <LoadingDiv />;
}

export const Home = hot(module)(HomeComp);