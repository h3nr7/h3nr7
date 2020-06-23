import styled from 'styled-components';
import { Grid, Typography } from '@material-ui/core';

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