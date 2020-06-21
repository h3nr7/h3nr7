import styled from 'styled-components';
import * as React from 'react';
import { PDFViewer as Viewer, Page, Font, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
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