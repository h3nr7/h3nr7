import * as React from 'react';
import { PDFViewer, Page, Font, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { hot } from 'react-hot-loader';


Font.register({
    family: 'rift-soft',
    src: 'https://use.typekit.net/af/528d29/00000000000000003b9adf13/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=i3&v=3'
});

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
        <PDFViewer>
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Text>Hello one</Text>
                </View>
                <View style={styles.section}>
                    <Text>Hello two</Text>
                </View>
            </Page>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Text>Hello one</Text>
                </View>
                <View style={styles.section}>
                    <Text>Hello two</Text>
                </View>
            </Page>
        </Document>
        </PDFViewer>
    );
}

export const CV = hot(module)(CVComp);