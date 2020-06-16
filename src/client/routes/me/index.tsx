import * as React from 'react';
import { IProfile } from '../../../shared/interfaces/profiles.interface';
import { MeContainer } from './me.styles';
import { hot } from 'react-hot-loader';
const MeComp:React.FC<IProfile> = () => {

    return (
        <MeContainer>
            me am me
        </MeContainer>
    )
}

export const Me = hot(module)(MeComp);





