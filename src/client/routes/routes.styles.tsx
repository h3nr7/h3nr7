import styled from 'styled-components';
import { AnimatedSwitch, AnimatedRoute } from 'react-router-transition';
import { Grid } from '@material-ui/core';


export const StyledAnimatedSwitch = styled(AnimatedSwitch)`
    position: relative;
    > div {
        position: absolute;
    }
`;

export const RedirectContainer = styled(Grid)`
    padding: 0 1.6rem;
`;