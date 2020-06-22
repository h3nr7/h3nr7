import styled from 'styled-components';
import * as React from 'react';
import { 
    PDFDownloadLink as DownloadLink, PDFViewer as Viewer, 
    Page, Font, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { StatelessComponent } from 'react';

export const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        fontFamily: 'roboto',
        fontSize: 10,
        fontWeight: 700
    },
    container: {

    },
    section: {
        display: 'flex',
        margin: 10,
        padding: 10,
        flex: 1,
    },
    col: {
        flex: 1,
        flexDirection: 'row'
    },
    h1: {
        fontFamily: 'rift-soft',
        fontWeight: 300,
        fontSize: 36,
        margin: 0,
        padding: '0 0 10 0'
    }
});

export const PDFViewer = styled(Viewer)`
    width: 100vw;
    height: 100vh;
`

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