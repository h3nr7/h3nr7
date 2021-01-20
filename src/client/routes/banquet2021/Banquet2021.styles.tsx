import styled from 'styled-components';
import { Typography, Grid } from '@material-ui/core';

export const TitleGrid = styled(Grid)`
    padding-bottom: 2rem;
`;

export const SubTitleGrid = styled(Grid)`
padding-bottom: 0rem;
`;

export const TopInfoGrid = styled(Grid)`
    padding-bottom: 2rem;
`;

export const MemberGrid = styled(Grid)`
    padding-bottom: 2rem;
`;

export const TeamGrid = styled(Grid)`
    padding-bottom: 2rem;
`;

export const TeamStandingGridContainer = styled(Grid)`
    padding-top: 0.5rem;
`;
TeamStandingGridContainer.defaultProps = { container: true };

export const Unit = styled.span`
    font-size: 50%;
    font-family: titillium-web, san-serifs;
    letter-spacing: 0.01rem;
`   

export const SmallUnit = styled.span`
    font-family: titillium-web, san-serifs;
    letter-spacing: 0.01rem;
    font-size: 0.85rem;

`;

export const MembeContainer = styled.div`
    padding-bottom: 2rem;
`;

export const MemberDataGrid = styled(Grid)`
    text-align:right;
`;