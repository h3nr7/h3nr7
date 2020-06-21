import * as React from 'react';
import { PDFViewer, Page, Font, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { hot } from 'react-hot-loader';
import { Switch, Route } from 'react-router-dom';
import { Pdf } from './Pdf'; 

const styles = StyleSheet.create({
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

const CVComp:React.FC<{}> = (props) => {

    return (
        <Switch>
            <Route exact path="/cv/:token/pdf" component={Pdf} />
        </Switch>
    );
}

export const CV = hot(module)(CVComp);