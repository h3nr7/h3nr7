import * as React from 'react';
import { hot } from 'react-hot-loader';
import { useLocation } from 'react-router-dom';
import { useArticles } from '../../helper/apiHooks';
import { IHome } from './home.interface';
import { LoadingDiv } from './home.styles';
import { SocialTags } from '../../components/socialtags';
import { ArticleList } from '../../components/articlelist';

const TWITTER_ID:string = process.env.TWITTER_ID || '';
const DEFAULT_IMAGE:string = process.env.DEFAULT_IMAGE || '';
const DEFAULT_TITLE:string = process.env.DEFAULT_TITLE || '';
const DEFAULT_DESC:string = process.env.DEFAULT_DESC || '';

const HomeComp:React.FunctionComponent<IHome> = () => {
    const [ page, setPage ] = React.useState(0);
    const [ filter, setFilter ] = React.useState(null);
    const [ isLoaded, setIsLoaded ] = React.useState(false);
    const { search } = useLocation();
    const articles = useArticles(10, page, true);

    React.useEffect(() => {
        const useQuery = new URLSearchParams(search);
        setFilter(useQuery.get('filter'));
        setIsLoaded(true);
    }, [articles, search]);

    return isLoaded ? (
        <div>
            <SocialTags 
                id={'h3nr7_home'} 
                url={window.location.href}
                title={DEFAULT_TITLE} 
                description={DEFAULT_DESC}
                twitterHandle={TWITTER_ID}
                image={`http://${window.location.host}/${DEFAULT_IMAGE}`}
                imageSecure={`https://${window.location.host}/${DEFAULT_IMAGE}`} />
            <ArticleList {...articles} filter={filter} />
        </div>
    ) : <LoadingDiv />;
}

export const Home = hot(module)(HomeComp);