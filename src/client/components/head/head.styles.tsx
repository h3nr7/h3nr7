import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Logo = styled(Link)`
    text-decoration:none;
    color: inherit;
    /* :hover {
        text-decoration: underline
    } */
`;

export const HeadContainer = styled.div`
    padding: 1rem 1rem 1rem 1.6rem;
    display: flex;
`;

export const ArrowImg = styled.img`
    position: flex;
    align-self: center;
    width: auto;
    margin: 0rem 0.5rem 0rem 0rem;
    height: 0.9rem;
`;