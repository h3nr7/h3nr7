import * as React from 'react';
import { UserContent } from './user.styles';
import { hot } from 'react-hot-loader';

const ErrorComp:React.StatelessComponent = () => (
    <UserContent>
        Error
    </UserContent>
);

export const Error = hot(module)(ErrorComp);

