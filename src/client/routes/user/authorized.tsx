import * as React from 'react';
import { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { getQueryByName } from '../../helper/routerHooks';
import { IUser } from '../../../shared/interfaces/user.interface';
import { UserContent } from './user.styles';
import { hot } from 'react-hot-loader';
import { useTokenUser } from '../../helper/apiHooks';

const AuthorizedComp:React.FC<IUser> = (props) => {
    const accessToken:string = getQueryByName('access_token');
    const user = useTokenUser(accessToken);


    return (
        <UserContent>
            {user  ? <Redirect to="/about/me"/> : <Redirect to="/user/error"/>}
        </UserContent>
    )
}

export const Authorized = hot(module)(AuthorizedComp);