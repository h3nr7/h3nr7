import styled from 'styled-components';
import { Typography, Grid } from '@material-ui/core';

export const ArticleContainer = styled.div`
    width: 100vw;
    padding: 0;
`;

export const HeaderGrid = styled(Grid)`
    @media (max-width: 960px) {
    }
`;

export const ContentGrid = styled(Grid)`
    padding: 0 1.6rem;
`;


export const Desc = styled(Typography)`
    color: rgba(255, 255, 255, 0.65);
    padding: 0;
    padding: 1.6rem 0 0;
    @media (max-width: 960px) {
        padding: 0;
    }
`;

export const HeroGrid = styled(Grid)`
    height: 20rem;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #000000;
    clip-path: polygon(0% 0%, 100% 0%, calc(100% - 2.75rem) 100%, 0% 100%);

    @media (max-width: 600px) {
        height: 10rem;
    }

`;

export const TitleGrid = styled(Grid)`
    
    padding: 0;
    @media (max-width: 960px) {
        padding: 1.6rem 1.6rem 0rem;
    }
`;

export const FooterGrid = styled.div`
    min-height: 2rem;
`;

export const LinkTypo = styled(Typography)`
    > a {
        text-decoration: none;
        color: inherit;
    }
`;

export const HeroImg = styled.img`
    width: 100%;
    height: auto;
`;
