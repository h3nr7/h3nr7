import Axios from 'axios';
import { useEffect, useState } from 'react';
import { getLinkedinToken, setLinkedinToken, setLinkedinUser, clearAll } from '../services/localstorage';
import { IArticles, IArticle, IArticleType, IArticleTypes } from '../../shared/interfaces/articles.interface';
import { 
    getArticles, getOneEntry, getArticleTypes, getLinkedinMe, 
    getTokenUser, getCV, getStravaProfile, getStravaActivities, getBanquetTeamStats, getBanquetStats, getBanquetTeams, getOneBanquetTeam } from '../services/api';
import { ITopics } from '../../shared/interfaces/topics.interface';
import { IMarkdown } from '../../shared/interfaces/markdowns.interface';
import { ICV } from '../../shared/interfaces/cvs.interface';
import { userInfo } from 'os';
import { IActivity, IAthlete } from 'strava-service';
import { IBanquetTeamStats, IBanquetStats, IBanquetTeam } from '../../shared/interfaces/banquet.interface';
import { idea } from 'react-syntax-highlighter/dist/cjs/styles/hljs';

export function useOneArticle(id:string):any {
    const initialState:IArticle = {
        id: null,
        title: null,
        description: null,
        content: null,
        markdownContent: null,
        createdAt: null,
        updatedAt: null,
        articleType: {
            id: null,
            title: null
        },
        heroImage: null,
        topics: []
    }

    const [ loaded, setLoaded ] = useState(false);
    const [ article, setArticle ] = useState(initialState);

    useEffect(() => {
        getOneEntry(id)
            .then(data => {
                setArticle(data);
                setLoaded(true);
            })
            .catch(err => {
                console.error('Error loading one article');
                setLoaded(false);
            })
    }, [loaded]);

    return article;
}

/**
 * 
 * @param limit use articles to get list of articles
 * @param skip 
 * @param isHome 
 */
export function useArticles(limit:number, skip:number, isHome?:boolean):any {
    const initialState:IArticles = {
        total: 0,
        skip: 0,
        limit: 10,
        items:[],
        assets:[]
    };
    const [ loaded, setLoaded ] = useState(false);
    const [ articles, setArticles ] = useState(initialState);

    useEffect(() => {
        getArticles(String(limit), String(skip), isHome)
            .then(data => {
                setArticles(data);
                setLoaded(true);
            })
            .catch(err => {
                console.error('get articles error');
                setArticles(initialState);
                setLoaded(true);
            });
    }, [loaded]);

    return articles;
}

/**
 * use article types to gt article types
 */
export function useArticleTypes():any {
    const initialState:IArticleTypes = {
        total: 0,
        skip: 0,
        limit: 0,
        items: []
    }
    const [ loaded, setLoaded ] = useState(false);
    const [articleTypes, setArticleTypes] = useState(initialState);
    useEffect(() => {
        getArticleTypes()
            .then(data => {
                setArticleTypes(data);
                setLoaded(true);
            })
            .catch(err => {
                console.error('get topics error');
                setArticleTypes(initialState);
                setLoaded(true);
            });
    }, [loaded]);

    return {
        ...articleTypes,
        items:[
            ...articleTypes.items,
            // disable
            // { title: 'archive', key:'archive', to: '/archive'},
            { title: 'about', key:'about', to: '/about'}
        ]
    };
}

/**
 * use topics to get all the topics
 */
export function useTopics():any {
    const initialState:ITopics = {
        total: 0,
        skip: 0,
        limit: 0,
        items: []
    }
    const [ loaded, setLoaded ] = useState(false);
    const [topics, setTopics] = useState(initialState);
    useEffect(() => {
        getArticleTypes()
            .then(data => {
                setTopics(data);
                setLoaded(true);
            })
            .catch(err => {
                console.error('get topics error');
                setTopics(initialState);
                setLoaded(true);
            });
    }, [loaded]);

    return topics;
}

/**
 * check is token is user and decode
 */
export function useTokenUser(token:string = null):any {
    const [user, setUser] = useState(null);

    useEffect(() => {
        async function getUser() {
            try {
                const foundUser = await getTokenUser(token);
                setUser(foundUser);
            } catch(e) {
                console.error('Invalid token');
                clearAll();
            }
        }
        getUser();
    }, []);

    return user;
}

export function useCV(token:string, cvId:string):ICV {
    const initialCV:ICV = {
        name: null,
        id: null,
        profile: {
            displayName: null,
            firstName: null,
            lastName: null,
            title: null,
            contact: null,
            email: null,
            address1: null,
            address2: null,
            city: null,
            postcode: null,
            skills: null
        }
    }
    const [cv, setCV] = useState(initialCV);
    useEffect(() => {
        async function getData() {
            try {
                const found = await getCV(cvId, token);
                setCV(found);
            } catch(e) {
                console.error(e.message);
            }
        }

        getData();
    }, [token, cvId]);
    

    return cv;
}


/**
 * load markdown as str from contentful
 * @param content
 */
export function useMarkdown(content:IMarkdown):any {

    const [ loaded, setLoaded ] = useState(false);
    const [markdownStr, setMarkdownStr] = useState(null);
    
    useEffect(() => {
        async function loadStr() {
            try {
                const str = await Axios.get(content.url);
                setMarkdownStr(str.data);
            } catch(e) {
                console.error('error loading markdown file');
            }
        }

        loadStr();
    }, [content, loaded]);

    return markdownStr;
}

export function useStravaMe():IAthlete {
    const [ loaded, setLoaded ] = useState(false);
    const [athlete, setAthlete] = useState<IAthlete>();

    useEffect(() => {
        async function getData() {
            try {
                const profile = await getStravaProfile();
                setAthlete(profile);
                setLoaded(true);
            } catch(e) {
                console.error('error loading profile');
                setLoaded(true);
            }
        }

        getData();
    }, [loaded]);

    return athlete;
}

export function useStravaActivities(
    startDate?:string, 
    endDate?:string, 
    saveData?: boolean, 
    perPage?: number, 
    page?: number
):IActivity[] {
    console.log('geeeet data', startDate,
    endDate,
    saveData,
    perPage,
    page);
    const [activities, setActivities] = useState<IActivity[]>();

    useEffect(() => {
        async function getData() {
            try {
                const activities = await getStravaActivities({
                    startDate, endDate, perPage, page, saveData
                });
                setActivities(activities);
            } catch(e) {
                console.error('error loading profile');
            }
        }

        getData();
    }, [startDate, endDate, saveData, perPage, page]);

    return activities;

}

export function useBanquetTeams():IBanquetTeam[] {
    const [stats, setStats] = useState<IBanquetTeam[]>();

    useEffect(() => {
        async function getStats() {
            try {
                const res = await getBanquetTeams();
                setStats(res);
            } catch(e) {
                console.error('Invalid Stats');
            }
        }

        getStats();
    }, []);

    return stats;
}

export function useBanquetOneTeam(id:string = null):IBanquetTeam {
    const [team, setTeam] = useState<IBanquetTeam>();

    useEffect(() => {
        async function getStats() {
            try {
                const res = await getOneBanquetTeam(id);
                setTeam(res);
            } catch(e) {
                console.error('Invalid Stats');
            }
        }

        getStats();
    }, [id]);

    return team;
}


/**
 * get banquet team stats
 */
export function useBanquetTeamStats(id:string = null):IBanquetTeamStats {
    const [stats, setStats] = useState<IBanquetTeamStats>();

    useEffect(() => {
        async function getStats() {
            try {
                const res = await getBanquetTeamStats(id);
                setStats(res);
            } catch(e) {
                console.error('Invalid Stats');
            }
        }

        getStats();
    }, [id]);

    return stats;
}

export function useBanquetStats():IBanquetStats {
    const [stats, setStats] = useState<IBanquetStats>();

    useEffect(() => {
        async function getStats() {
            try {
                const res = await getBanquetStats();
                setStats(res);
            } catch(e) {
                console.error('Invalid Stats');
            }
        }

        getStats();
    }, []);

    return stats;
}




