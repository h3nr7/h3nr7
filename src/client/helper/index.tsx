import { useEffect, useState } from 'react';
import { IArticles, IArticle, IArticleType, IArticleTypes } from '../../shared/interfaces/articles.interface';
import { getArticles, getOneArticle, getArticleTypes } from '../services/api';
import { ITopics } from '../../shared/interfaces/topics.interface';

export function useOneArticle(id:string):any {
    const initialState:IArticle = {
        id: null,
        title: null,
        description: null,
        content: null,
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

/** use rticles */
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

    return articleTypes;
}

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