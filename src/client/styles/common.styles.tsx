import styled from 'styled-components';
import { Grid, Typography } from '@material-ui/core';
import { Link as RoutLink } from 'react-router-dom';

/**
 * default container
 */
export const Container = styled(Grid)`
    width: 100vw;
    padding: 0 1.6rem;
`

export const Section = styled(Grid)`
    margin: 15px 0 0;
`

export const Paragraph = styled(Typography)`
    padding-bottom: 1rem;
`

// plain link with nothing
export const PlainLink = styled(RoutLink)`
    text-decoration: none;
    color: inherit;

    &:visited {
        color: inherit;
    }
`;

// simple link with basic styles
export const SimpleLink = styled(RoutLink)`
    color: inherit;
    text-decoration: underline;

    &:visited {
        color: inherit;
    }

    &:hover {
        text-decoration: none;
    }
`;

export const A = styled.a`
    color: inherit;
    text-decoration: underline;

    &:visited {
        color: inherit;
    }

    &:hover {
        text-decoration: none;
    }
`;

export const OutlinedButton = styled.button`
    border-radius: 3rem;
    height: auto;
    padding: 0.5rem 1.5rem;
    font-family: titillium-web, san-serifs;
    font-weight: 300;
    font-size: 0.8rem;
    background: none;
    color: white;
    border: 2px white solid;
    cursor: pointer;

    &:hover{
        color: #cccccc;
        border: 2px #cccccc solid;
        &:before {
            clip-path: polygon(0% 0%, 20% 0%, calc(20% - 0.65rem) 100%, 0 100%);
        }
    }

    &:focus {
        outline: none;
    }
`

export const CTA = styled.button`
    border: none;
    background: none;
    cursor: pointer;
    font-family: 'rift-soft';
    font-style: italic;
    font-weight: 500;
    font-size: 1.5rem;
    color: black;
    display: inline-block;
    position: relative;
    width: 120px;
    height: 48px;
    margin: auto;
    padding: 0.2rem 0 0 0px;
    text-decoration: none;
    transition: color 0.5s ease-in;

    &:before {
        content: ' ';
        z-index: -1;
        position: absolute;
        left: 0;
        top: 0;
        width: 120px;
        height: 48px;
        clip-path: polygon(0% 0%, 100% 0%, calc(100% - 0.65rem) 100%, 0 100%);
        background: white;
        transition: clip-path 0.25s ease-in-out; 

    }

    &:hover{
        color: white;
        &:before {
            clip-path: polygon(0% 0%, 20% 0%, calc(20% - 0.65rem) 100%, 0 100%);
        }
    }

    &:focus {
        outline: none;
    }
`