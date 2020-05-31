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
    padding: 1.6rem 0 1rem;
    @media (max-width: 960px) {
        padding: 0 0 0.5rem;
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
    margin-bottom: 1rem;

    > a {
        text-decoration: none;
        color: inherit;
    }
`;

export const HeroImg = styled.img`
    width: 100%;
    height: auto;
`;

export const BackBut = styled.div<{state?:any}>`
    cursor: pointer;
    top: 18rem;
    left: 0px;
    position: absolute;
    padding: 0 1.6rem;
    width: 120px;
    height: 2rem;
    color: white;
    background: #181A19;
    clip-path: polygon(0 0, 100% 0%, calc(100% - 0.28rem) 100%, 0 100%);
    transition: transform 0.25s ease-in-out;
    transition-delay: 1s;
    transform: translateX(
        ${({state}) => (state === "entering" || state === "entered" ? 0 : -120)}px
    );

    @media (max-width: 600px) {
        top: 8rem;
    }
`;
