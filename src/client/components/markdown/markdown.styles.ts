import styled from 'styled-components';
import { Typography } from '@material-ui/core';
import { Img } from 'react-image';
// this would be hidden coming from markdown documents on github
// export const H1 = styled(Typography)`
//     font-size: 3rem;
//     font-family: rift-soft,san-serif;
//     font-style: italic;
//     font-weight: 300;
//     margin: 0;
// `;

export const H2 = styled.h2`
    font-size: 2.75rem;
    font-family: rift-soft,san-serif;
    font-style: italic;
    font-weight: 500;
    margin: 0;
`;

export const H3 = styled.h3`
    font-family: rift-soft,san-serif;
    font-size: 1.2rem;
    font-style: italic;
    font-weight: 300;
    line-height: 1.235;
    padding: 1rem 0 0.5rem;
    margin: 0;
`;

export const H4 = styled.h4`
    font-family: rift-soft,san-serif;
    font-size: 1.2rem;
    font-style: italic;
    font-weight: 300;
    line-height: 1.235;
    margin: 0;
    margin-bottom: 0.5rem;
`;

export const H5 = styled.h5`
    font-family: rift-soft,san-serif;
    font-style: italic;
    font-size: 1.5rem;
    font-weight: 300;
    color: rgba(255,255,255,0.65);
    margin: 0;
    padding: 1.6rem 0 1rem;
`;

export const H6 = styled.h6`
    font-family: titillium-web,serif;
    font-size: 0.875rem;
    font-weight:300;
    line-height: 1.43;
    margin: 0;
    margin-bottom: 0.5rem;
`;

export const Paragraph = styled.p`
    font-size: 0.875rem;
    font-family: titillium-web,serif;
    font-weight: 400;
    line-height: 1.43;
    margin: 0;
    margin-bottom: 2rem;
`;

export const Image = styled(Img)`
    width: 100%;
    height: auto;
`;

export const Link = styled.a`
    text-decoration: none;
    color: #ededed;
    :hover {
        text-decoration: underline;
    }
`;

export const Ul = styled.ul`
    margin: 0;
    padding: 0 0 1rem;
`;

export const Li = styled.li`
    font-size: 0.8rem;
    list-style: inside square;
    margin: 0;
    padding: 0;
`;

