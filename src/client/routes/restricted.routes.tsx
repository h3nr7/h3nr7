import * as React from 'react';
import { Route,  RouteProps, RouteComponentProps, useHistory } from 'react-router-dom';
import { useTokenUser } from '../helper/apiHooks';
import { RedirectContainer } from './routes.styles';

const RestrictedComp:React.StatelessComponent = () => (
    <RedirectContainer>Restricted...</RedirectContainer>
);

export const RestrictedRoute = ({component:Component, ...rest}:RouteProps) => {
    const user = useTokenUser();
    return (
        <Route {...rest} render={(props) => (
            <div>
                {!user ? <RestrictedComp /> : <Component {...props}/>}
            </div>
        )} />
    );
};