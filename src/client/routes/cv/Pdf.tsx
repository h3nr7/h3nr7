import * as React from 'react';
import { hot } from 'react-hot-loader';
import { 
    Image , Page, Font, Text, View, Document, StyleSheet 
} from '@react-pdf/renderer';
import { IUser } from '../../../shared/interfaces/user.interface';
import { IPage } from './cv.interface';
import { PDFViewer, PDFDownloadLink, pdfStyles as styles } from './cv.styles';
import { useCV } from '../../helper/apiHooks';
import { PageHeader } from './header'
import { Summary  } from './summary'
import { Experience } from './experience'
import { Education } from './education'
import { Skills } from './skill' 

Font.register({
    family: 'rift-soft',
    fonts: [
        {
            src: '/public/rift_light_italic.woff',
            fontWeight: 100
        },
        {
            src: '/public/rift_italic.woff',
            fontWeight: 300
        },
        {
            src: '/public/rift_medium_italic.woff',
            fontWeight: 500
        }
    ]
}); 

Font.register({
    family: 'Akkurat',
    fonts: [
        {
            src: '/public/Akkurat.woff',
            fontWeight: 300
        },
        {
            src: '/public/Akkurat_Bold.woff',
            fontWeight: 500
        }
    ]
});


/**
 * Page 1 of CV
 */
const Page1:React.FC<IPage> = ({user, cv}) => {
    const { tokenImg } = user; 
    const { summary, experiences, profile } = cv
    return (
        <Page size="A4" style={styles.page} rulerSteps={20}>
            <PageHeader img={tokenImg} profile={profile}/>
            <View style={styles.content}>
                <Summary summary={summary}/>
                <Experience experiences={experiences}/>
            </View>
            <View style={styles.content}>
                <Skills />
            </View>
        </Page>
    )
}

/**
 * Page 2 of CV
 */
const Page2:React.FC<IPage> = (props) => {
    return (
        <Page size="A4" style={styles.page}>
            <View style={styles.content}>
                <Education />
            </View>
        </Page>
    )
}

const PdfComp:React.FC<{user:IUser, token:string}> = ({user, token}) => {

    const cv = useCV(token, user.cvId);
    const { tokenImg } = user;
    return (
    <div>
        <PDFViewer>
            <Document>
                <Page1 user={user} cv={cv}/>
                <Page2 user={user} cv={cv}/>
            </Document>
        </PDFViewer>
        {/* <PDFDownloadLink document={
            <Document>
                <Page1 />
                <Page2 />
            </Document>
        }>Download</PDFDownloadLink> */}
    </div>
    );
}

export const Pdf = hot(module)(PdfComp);