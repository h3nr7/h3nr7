import * as React from 'react';
import { Route,  RouteProps, RouteComponentProps, useHistory } from 'react-router-dom';
import { useCheckUser } from '../helper/apiHooks';
import { RedirectContainer } from './routes.styles';

const RedirectingComp:React.StatelessComponent = () => {
    window.location.href = '/auth/linkedin';
    return <RedirectContainer>Redirecting...</RedirectContainer>;
}

export const PrivateRoute = ({component:Component, ...rest}:RouteProps) => {
    const user = useCheckUser();
    return (
        <Route {...rest} render={(props) => (
            <div>
                {!user ? <RedirectingComp /> : <Component {...props}/>}
            </div>
        )} />
    );
};