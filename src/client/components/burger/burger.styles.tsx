import styled from 'styled-components';
import { withTheme } from "@material-ui/core/styles"
import { NavLink as Link } from 'react-router-dom';

export const Container = styled.div<{ state?: any }>`
    position: fixed;
    left: 0;
    top: 0;
    /* width: 85vw; */
    height: 100vh;
    z-index: 9998;
`;

export const Content = styled.div<{ state?: any }>`
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: calc(85vw - 45px);
    height: 100vh;
    background: white;
    padding: 5rem 1.8rem 1rem;
    transition: all 0.25s ease-in-out;
    z-index: ${({state}) => (state === 'entering' || state === 'entered' || 'exiting' ? 9999 : -1)};
    transform: translateX(
        calc(${({state}) => (state === "entering" || state === "entered" ? '15vw + 45px' : '100vw')})
    );
`;

export const BG = styled.div<{ state?: any }>`
    display: ${({state}) => (state === 'exited' ? 'none' : 'block')};
    visibility: ${({state}) => (state === 'exited' ? 'hidden' : 'visible')};
    position: absolute;
    width: 100vw;
    height: 100vh;
    left: 0;
    top: 0;
    background: rgba(0,0,0,0.75);
    transition: opacity 0.5s ease-in-out;
    z-index: ${({state}) => (state === 'entering' || state === 'entered' ? 9998 : -1)};
    opacity: ${({state}) => (state === 'entering' || state === 'entered' ? 1 : 0)};
`;

export const MenuContainer = styled.div<{ state?: any }>`
    position: absolute;
    left: 0;
    top: 0.9rem;
    width: 47px;
    height: 2rem;
    background: white;
    clip-path: polygon(0.55rem 0%, 100% 0%, 100% 100%, 0 100%);
    z-index: ${({state}) => (state === 'entering' || state === 'entered' ? 9999 : -1)};
    transition: transform 0.25s ease-in-out;
    transform: translateX(
        calc(${({state}) => (state === "entering" || state === "entered" ? '15vw' : '100vw - 45px')})
    );`;

export const StripContainer = styled.div`
    position: absolute;
    right: 13px;
    top: 0.5rem;
    width: 20px;
    height: auto;
    cursor: pointer;
`;

export const Strip = styled.div<{ state?:any }>`
    position: relative;
    display: block;
    
    text-align: right;
    width: 15px;
    height: 2px;
    margin-bottom: 0.3rem;
    background: #0E1326;
    clip-path: polygon(0.05rem 0%, 100% 0%, 100% 100%, 0 100%);
    transition: transform 0.25s ease-in-out;

    &:first-child {
        transition-delay: 0s;
        transform: translateX(
            ${({state}) => (state === "entering" || state === "entered" ? 0 : 2)}px
        );
    }

    &:nth-child(2) {
        transition-delay: 0.25s;
        transform: translateX(
            ${({state}) => (state === "entering" || state === "entered" ? -2 : -4)}px
        );
    }

    &:nth-child(3) {
        transition-delay: 0.5s;
        transform: translateX(
            ${({state}) => (state === "entering" || state === "entered" ? -4 : 4)}px
        );
    }
`;

export const BurLinkWrapper = styled.div<{ state?: any }>`
    display: block;
    color: #0E1326;
    width: auto;
    text-align: right;
    opacity: ${({state}) => (state === 'entering' || state === 'entered' ? 1 : 0)};
`;

export const BurLink = styled(Link)`
    text-decoration: none;
    color: inherit;
`;