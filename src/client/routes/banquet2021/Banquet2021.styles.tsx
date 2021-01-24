import styled from 'styled-components';
import{ Img as ReactImg } from 'react-image';
import { Typography, Grid } from '@material-ui/core';
import { OutlinedButton } from '../../styles/common.styles';

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

export const Paragraph = styled(Typography)`
    padding: 0 0rem 1.5rem 0;
`;

Paragraph.defaultProps = { variant: 'body1' }; 



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

export const MemberDataGrid = styled(Grid)`
    text-align:right;
`;

export const ImgGrid = styled(Grid)`
    padding-bottom: 2rem;
`;
ImgGrid.defaultProps = { container: true };

export const MiniImg = styled.img`
    border-radius: 50px;
    margin-right: 0.5rem;

    ${props => props.theme.breakpoints.down('sm')} {
        width: 3rem;
        height: 3rem;
    }

    ${props => props.theme.breakpoints.up('sm')} {
        width: 3rem;
        height: 3rem;
    }

`;

export const Unknown = styled.div`
    border-radius: 50px;
    margin-right: 0.5rem;
    background: grey;
    color: white;
    font-size: 1rem;
    font-weight: 600;
    text-align: center;
    letter-spacing: 0.2rem;

    ${props => props.theme.breakpoints.down('sm')} {
        width: 3rem;
        height: 3rem;
        padding-top: 0.75rem;
    }

    ${props => props.theme.breakpoints.up('sm')} {
        width: 3rem;
        height: 3rem;
        padding-top: 0.75rem;
    }
`;

export const HeroGrid = styled(Grid)`
    && {
        height: 10rem;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #ffffff;
        clip-path: polygon(0% 0%, 100% 0%, calc(100% - 2.75rem) 100%, 0% 100%);

        margin-bottom: 2rem;
    }
`;

export const HeroImg = styled(ReactImg)`
    width: 100%;
    height: auto;
`;

export const MainOutlinedButton = styled(OutlinedButton)`
    && {
        border-color: rgb(255, 70, 20);
        color: rgb(255, 70, 20);

        &:hover {
            border-color: grey;
            color: grey;
        }
    }
`;