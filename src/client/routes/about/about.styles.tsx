import styled from 'styled-components';
import { Link as NavLink } from 'react-router-dom';
import { Grid } from '@material-ui/core';

export const Link = styled(NavLink)`
    
`;

export const MeContainer = styled.div`

`;

export const SocialContainer = styled(Grid)`
    margin-top: 0.5rem;
    flex-direction: row;
`

export const SocialLink = styled.a`
    display: inline-block;
    margin-right: 0.8rem;
`