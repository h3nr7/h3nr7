import * as React from 'react';
import { Route,  RouteProps } from 'react-router-dom';
import { useTokenUser } from '../helper/apiHooks';
import { RedirectContainer } from './routes.styles';

const RedirectingComp:React.StatelessComponent = () => {
    window.location.href = '/auth/linkedin';
    return <RedirectContainer>Redirecting...</RedirectContainer>;
}

export const PrivateRoute = ({component:Component, ...rest}:RouteProps) => {
    const user = useTokenUser();
    return (
        <Route {...rest} render={(props) => (
            <div>
                {!user ? <RedirectingComp /> : <Component {...{...props, user}} />}
            </div>
        )} />
    );
};