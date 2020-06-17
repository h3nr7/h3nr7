import * as React from 'react';
import { IUser } from '../../../shared/interfaces/user.interface';
import { UserContent } from './user.styles';
import { hot } from 'react-hot-loader';

const ProfileComp:React.FC<IUser> = (props) => {

    return (
        <UserContent>
            Profile
        </UserContent>
    )
}

export const Profile = hot(module)(ProfileComp);