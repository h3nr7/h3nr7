import * as React from 'react';
import { PrivateRoute } from '../private.routes';

import { IUser } from '../../../shared/interfaces/user.interface';
import { UserContainer, UserContent } from './user.styles';
import { hot } from 'react-hot-loader';
import { Switch, Route } from 'react-router-dom';
import { Authorized } from './authorized';
import { Profile } from './profile';
import { Error } from './error';


const NotFound:React.StatelessComponent = () => (
    <UserContent>
        Not found
    </UserContent>
);

const UserComp:React.FC<IUser> = (props) => {

    return (
        <UserContainer>
            <Switch>
                <PrivateRoute  path="/user/profile" component={Profile} />
                <Route path="/user/authorized" component={Authorized} />
                <Route path="user/error" component={Error} />
                <Route path="/user" component={NotFound} />
            </Switch>
        </UserContainer>
    )
}

export const User = hot(module)(UserComp);