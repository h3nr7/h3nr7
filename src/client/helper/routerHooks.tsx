import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const getQueryByName = (name:string | string[]):any|string|string[] => {
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    if(Array.isArray(name)) {
        return name.map(n => query.get(n));
    }
    return query.get(name);
}
