import { useEffect, useState } from 'react';
import { IArticles } from '../../shared/interfaces/articles.interface';
import { getArticles } from '../services/api';

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