import * as React from 'react';
import { Route,  RouteProps, RouteComponentProps, useHistory } from 'react-router-dom';
import { useCheckUser } from '../helper/apiHooks';
import { RedirectContainer } from './routes.styles';

const RestrictedComp:React.StatelessComponent = () => (
    <RedirectContainer>Restricted...</RedirectContainer>
);

export const RestrictedRoute = ({component:Component, ...rest}:RouteProps) => {
    const user = useCheckUser();
    return (
        <Route {...rest} render={(props) => (
            <div>
                {!user ? <RestrictedComp /> : <Component {...props}/>}
            </div>
        )} />
    );
};