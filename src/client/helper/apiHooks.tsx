import { useEffect, useState } from 'react';
import Axios from 'axios';
import { getLinkedinToken, setLinkedinToken, setLinkedinUser, clearAll } from '../services/localstorage';
import { IArticles, IArticle, IArticleType, IArticleTypes } from '../../shared/interfaces/articles.interface';
import { getArticles, getOneArticle, getArticleTypes, getLinkedinMe } from '../services/api';
import { ITopics } from '../../shared/interfaces/topics.interface';
import { IMarkdown } from '../../shared/interfaces/markdowns.interface';

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
        getOneArticle(id)
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
 * check is user authed and update user
 */
export function useCheckUser(token:string = null):any {
    if(token) setLinkedinToken(token);
    else token = getLinkedinToken();

    const [user, setUser] = useState(null);

    useEffect(() => {
        async function checkLinkedInToken() {
            try {
                const foundUser = await getLinkedinMe(token);
                setLinkedinUser(foundUser);
                setUser(foundUser);
            } catch(e) {
                console.error('Invalid token');
                clearAll();
            }
        }

        checkLinkedInToken();
    });

    return user;
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
