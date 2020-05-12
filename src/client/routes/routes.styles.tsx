import styled from 'styled-components';
import { AnimatedSwitch } from 'react-router-transition';


export const StyledAnimatedSwitch = styled(AnimatedSwitch)`
    position: relative;
    > div {
        position: absolute;
    }
`;