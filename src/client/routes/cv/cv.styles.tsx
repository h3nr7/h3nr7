import styled from 'styled-components';
import * as React from 'react';
import { 
    PDFDownloadLink as DownloadLink, 
    PDFViewer as Viewer, StyleSheet } from '@react-pdf/renderer';
import { Grid } from '@material-ui/core';

/**
 * styles for index
 */
export const indexStyles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        fontFamily: 'rift-soft'
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    }
});

/**
 * styles for pdf
 */
export const pdfStyles = StyleSheet.create({
    page: {
        fontFamily: 'Akkurat',
        fontSize: 9,
        fontWeight: 300,
        letterSpacing: -0.25,
        padding: '29 20'
    },
    container: {
        flexDirection: 'column',
    },
    heading: {
        flexDirection: 'row'
    },
    info: {
        paddingBottom: 0.5,
        paddingTop: 1,
        fontFamily: 'Akkurat',
        fontWeight: 300,
        fontSize: 9
    },
    content: {
        marginTop: 32,
        flexDirection: 'row',
    },
    section: {
        display: 'flex',
        maxWidth: '50%',
        paddingRight: 20
    },
    title: {
        fontFamily: 'rift-soft',
        fontSize: 24,
        fontWeight: 100, 
        color: 'rgb(89, 90, 95)'
    },
    subTitle: {
        color: 'rgb(89, 90, 95)'
    },
    h1: {
        color: 'rgb(0,0,0)',
        display: 'flex',
        fontFamily: 'rift-soft',
        fontWeight: 300,
        fontSize: 30,
        margin: 0,
        marginBottom: -5,
        padding: 0,
        alignSelf: 'flex-start'
    },
    h3: {
        display: 'flex',
        fontFamily: 'rift-soft',
        fontWeight: 500, 
        fontSize: 13,
        margin: 0,
        marginTop: -2,
        padding: 0,
        color: 'rgb(89, 90, 95)'

    },
    h6: {
        paddingBottom: 5,
        paddingTop: 1,
        fontFamily: 'Akkurat',
        fontWeight: 300,
        fontSize: 9
    },
    p: {
        paddingBottom: 5,
        lineHeight: 1.5,
        letterSpacing: 0,
        color: 'rgb(89, 90, 95)'
    }
});

/**
 * styles for pdf viewer
 */
export const PDFViewer = styled(Viewer)`
    width: 100vw;
    height: 100vh;
`

/**
 * styles for pdf download link button
 */
export const PDFDownloadLink = styled(DownloadLink)`
    font-family: 'rift-soft';
    font-style: italic;
    font-weight: 700;
    color: black;
    display: inline-block;
    position: relative;
    width: 20px;
    height: 36px;
    margin: auto;
    padding: 0.44rem 0 0 125px;
    text-decoration: none;
    transition: color 0.5s ease-in;

    &:before {
        content: ' ';
        z-index: -1;
        position: absolute;
        left: 0;
        top: 0;
        width: 200px;
        height: 36px;
        clip-path: polygon(0% 0%, 100% 0%, calc(100% - 10px) 100%, 0 100%);
        background: white;
        transition: clip-path 0.25s ease-in-out; 

    }

    &:hover{
        color: white;
        &:before {
            clip-path: polygon(0% 0%, 60% 0%, calc(60% - 0.55rem) 100%, 0 100%);
        }
    }
`;

export const Footer = styled(Grid)`
    margin-top: 30px;
`;

export const TitleSpan = styled.span`
    margin-right: 0.5rem;
    text-transform: uppercase;
`;