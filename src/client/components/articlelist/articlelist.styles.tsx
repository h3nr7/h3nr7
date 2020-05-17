import styled from 'styled-components';
import { Link as RoutLink } from 'react-router-dom';
import { Typography } from '@material-ui/core';
export const Ul = styled.ul`
    display: flex;
    flex-direction: column;
    width: 100vw;
    margin: 0;
    padding: 0;
`;

const BasicLi = styled.li<{ count: number, state?: string }>`
    width: 100%;
    margin: 0;
    list-style: none;
    padding: 0rem 1rem 1.5rem 1rem;
    background: rgba(0,0,0,0);
    transition: opacity 0.2s ease-in-out, transform 0.2s ease-in-out, background 0.35s ease-in-out;
    /* transition for route changes */
    transition-delay: ${({count}) => {
        return count * 0.05
    }}s;

    opacity:  ${({state}) => {
        switch(state) {
            case 'entered':
                return 1;
            case 'entering':
                return 0;
            case 'exiting':
                return 0;
            case 'exited':
                return 1;
        }
    }};

    display: ${({state}) => (state === "exited" ? 'none' : 'block')};
    transform: translateX(
        ${({state}) => {
        switch(state) {
            case 'entered':
                return 0;
            case 'entering':
                return -50;
            case 'exiting':
                return 50;
            case 'exited':
                return 0;
        }
    }}px);

`;

export const MobileLi = styled(BasicLi)`

`;

export const DesktopLi = styled(BasicLi)`
    cursor: pointer;

    /* movements for hover */
    > a > h3 {
        transition: transform 0.25s ease-in-out;
        transform: translateX(0);
    }

    > a > h6 {
        transition: transform 0.25s ease-in-out;
        transition-delay: 0.075s;
        transform: translateX(0);
    }
    
    :hover {
        background: ${({state}) => (state === "entering" || state === "entered" ? 'rgba(0,0,0,0.35)' : 'none')};
        > a > h3 {
            transform: translateX(
                ${({state}) => (state === "entering" || state === "entered" ? 2.5 : 0)}rem
            );
        }

        > a > h6 {
            transform: translateX(
                ${({state}) => (state === "entering" || state === "entered" ? 2 : 0)}rem
            );
        }
    }
`;

export const Desc = styled(Typography)`
    color: rgba(255, 255, 255, 0.65);
`;

export const Link = styled(RoutLink)`
    text-decoration: none;
    color: inherit;
`;