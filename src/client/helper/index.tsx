import { useEffect, useState } from 'react';
import { IArticles, IArticle } from '../../shared/interfaces/articles.interface';
import { getArticles, getOneArticle } from '../services/api';

export function useOneArticle(id:string):any {
    const initialState:IArticle = {
        id: null,
        title: null,
        description: null,
        createdAt: null,
        updatedAt: null,
        pageType: [],
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

export function useArticles(limit:number, skip:number):any {
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
        getArticles(String(limit), String(skip))
            .then(data => {
                setArticles(data);
                setLoaded(true);
            })
            .catch(err => {
                console.error('get articles error');
                setArticles(initialState);
            });
    }, [loaded]);

    return articles;
}