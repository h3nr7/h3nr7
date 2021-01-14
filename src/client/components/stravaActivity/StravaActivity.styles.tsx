import styled from 'styled-components';
import SVG from 'react-inlinesvg';

import { 
    Typography,
    withStyles,
    Grid } from '@material-ui/core';

export const Icon = styled(SVG)`
    /* position: flex; */
    align-self: center;
    width: auto;
    margin: 0rem 0rem 0rem 0rem;
    height: 2rem;
    fill: white;
    
`;

export const Container = styled.div`
    padding: 1rem 0;
    display: flex;
    flex-direction: row;
    ${props => props.theme.breakpoints.down('sm')} {
        padding: 1.5rem 0;
    }

    ${props => props.theme.breakpoints.up('sm')} {
        padding: 1rem 0;
    }
`;

export const ContentDiv = styled.div`
    flex: 35;
`;

export const IconDiv = styled.div`
    position: relative;
    flex: 1;
    ${props => props.theme.breakpoints.down('sm')} {
        padding-right: 1.5rem;
    }

    ${props => props.theme.breakpoints.up('sm')} {
        padding-right: 2rem;
    }
`;

export const DataBox = styled(Typography)`

`;

export const Unit = styled.span`
    font-size: 1.5rem;
    font-family: titillium-web, san-serifs;
    letter-spacing: 0.01rem;
`   

export const Desc = styled.span`
    font-size: 0.75rem;
    font-family: titillium-web, san-serifs;
    letter-spacing: 0.01rem;

    ${props => props.theme.breakpoints.down('xs')} {
        width: 60px;
        display: inline-block;
    }

    ${props => props.theme.breakpoints.up('xs')} {
    }
`;

DataBox.defaultProps = {
    variant: 'h3'
}

export const Title = styled(Typography)`
    && {
        font-size: 1.25rem;
        padding: 0;
        margin: 0;
    }
`;

Title.defaultProps = {
    variant: 'h4'
}

export const Date = styled(Typography)`
    && {
        font-size: 0.75rem;
    }
`;

Date.defaultProps = {
    variant: 'body1'
}
