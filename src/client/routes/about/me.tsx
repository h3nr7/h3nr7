import * as React from 'react';
import { hot } from 'react-hot-loader';
import { MeContainer } from './about.styles';

const MeComp:React.FC<{}> = (props) => {

    return (
        <MeContainer>
            me am me
        </MeContainer>
    )
}

export const Me = hot(module)(MeComp);