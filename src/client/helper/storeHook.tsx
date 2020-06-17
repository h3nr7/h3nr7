import { useState, useEffect } from 'react';
import { setLinkedinToken, clearAll } from '../services/localstorage';

export const saveToken = (token:string):string => {
    const [lsToken, setLsToken] = useState(null);

    useEffect(() => {
        if(token) {
            setLinkedinToken(token);
            setLsToken(token);
        } else {
            clearAll();
            setLinkedinToken(null);
        }
    });

    return lsToken;
}