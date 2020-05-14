import * as React from 'react';
import { hot } from 'react-hot-loader';
import { useLocation } from 'react-router-dom';
import { useArticles } from '../../helper';
import { IHome } from './home.interface';
import { LoadingDiv } from './home.styles';
import { SocialTags } from '../../components/socialtags';
import { ArticleList } from '../../components/articlelist';

const HomeComp:React.FunctionComponent<IHome> = () => {
    const [ page, setPage ] = React.useState(0);
    const [ filter, setFilter ] = React.useState(null);
    const [ isLoaded, setIsLoaded ] = React.useState(false);
    const { search } = useLocation();
    const articles = useArticles(10, page, true);

    React.useEffect(() => {
        console.log('Received articles: ', articles, search, filter);
        const useQuery = new URLSearchParams(search);
        setFilter(useQuery.get('filter'));
        setIsLoaded(true);
    }, [articles, search]);

    return isLoaded ? (
        <div>
            <SocialTags 
                id={'h3nr7_home'} 
                url={window.location.href}
                title={'h3nr7 :: Creative Technologist'} 
                description={'Interactive logs of yet another geek'}
                twitterHandle='@_h3nr7'
                image={`http://images.ctfassets.net/wjpxigc6xst0/1uENuODJOUg5nQFP8B6FCA/25f5d0632acc0804a134cdca8cef43f1/36806897_2081436712113666_7513637464322342912_n.jpg`}
                imageSecure={`https://images.ctfassets.net/wjpxigc6xst0/1uENuODJOUg5nQFP8B6FCA/25f5d0632acc0804a134cdca8cef43f1/36806897_2081436712113666_7513637464322342912_n.jpg`} />
            <ArticleList {...articles} filter={filter} />
        </div>
    ) : <LoadingDiv />;
}

export const Home = hot(module)(HomeComp);