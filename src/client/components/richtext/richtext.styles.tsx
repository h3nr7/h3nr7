import styled from 'styled-components';
import { Typography } from '@material-ui/core';

export const EmImg = styled.img`
    width: 100%;
    height: auto;
`;

export const EmAssets = styled.div`
    margin-bottom: 1rem;
`;

export const CodeMark = styled.span`
    display: block;
    width: 100%;
    height: auto;
    background: rgb(0, 0, 0);
    padding: 1rem;
    font-size: 0.8rem;
    color: #f24182;
`;

export const Paragraph = styled(Typography)`
    margin-bottom: 1rem
`;

export const Spacedspan = styled.span`
    content: ' ';
    margin: 0 2em;
    display: inline-block;
`;


export const Li = styled.li`
    > p {
        margin-bottom: 0;  
    }
`;