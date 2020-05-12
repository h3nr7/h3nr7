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

export const Li = styled.li`
    width: 100%;
    margin: 0;
    list-style: none;
    padding: 0rem 1rem 1.5rem 1rem;
    background: rgba(0,0,0,0);
    cursor: pointer;
    transition: background 0.25s ease-in-out;
    :hover {
        background: rgba(0,0,0,0.35);
    }
`;

export const Desc = styled(Typography)`
    color: rgba(255, 255, 255, 0.65);
`;

export const Link = styled(RoutLink)`
    text-decoration: none;
    color: inherit;
`;