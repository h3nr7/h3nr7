import styled from 'styled-components';
import { NavLink as Link } from 'react-router-dom';
import SVG from 'react-inlinesvg';

export const NaviContainer = styled.div`
    padding: 1rem 1rem 1rem 1.6rem;
    display: flex;
    flex-flow: row;
`;


export const NavLinkWrapper = styled.div<{ count: number, state?: any }>`
    display: inline-block;
    /* margin-left: 1.5rem; */
    transition: all 0.25s ease-in-out;

    :first-child {
        margin-left: 0.2rem;

    }
    :before {
        content: ' . ';
    }
    margin-right: 0.2rem;
    transition-delay: ${({count}) => 0.1 * count}s;
    opacity:  ${({state}) => (state === "entering" || state === "entered" ? 1 : 0)};
    transform: translateX(
        ${({state}) => (state === "entering" || state === "entered" ? 0 : 50)}px
    );
`;

export const NavLink = styled(Link)`
    text-decoration:none;
    color: inherit;
`;

export const HeadContainer = styled.div`
    padding: 1rem 1rem 1rem 1.6rem;
    display: flex;
`;

export const LinkContainer = styled.div`
`

export const ArrowImg = styled(SVG)`
    /* position: flex; */
    align-self: center;
    width: auto;
    margin: 0rem 0.5rem 0rem 0rem;
    height: 0.9rem;
`;