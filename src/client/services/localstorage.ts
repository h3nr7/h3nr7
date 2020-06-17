import * as ls from 'local-storage'; 
import { IUser } from '../../shared/interfaces/user.interface';

export const getLinkedinToken = ():string => {
    return ls.get('linkedinToken');
}

export const setLinkedinToken = (token:string) => {
    ls.set('linkedinToken', token);
}

export const setLinkedinUser = (user:IUser) => {
    ls.set('linkedinUser', user);
}

export const getLinkedinUser = ():IUser => {
    return ls.get<IUser>('user');
}

export const clearAll = () => {
    ls.clear();
}

