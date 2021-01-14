import * as React from 'react';
import { hot } from 'react-hot-loader';
import ReactPDF, { 
    Image , Page, Font, Text, View, Document 
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
import { Reference } from './Reference';
import { ICV } from '../../../shared/interfaces/cvs.interface';



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
    const { summary, experiences, educations, profile } = cv

    const viewStyles:ReactPDF.Styles = {
        style: {
            marginBottom: 30
        }
    }

    return (
        <Page size="A4" style={styles.page} /*rulerSteps={20}*/ >
            <PageHeader img={tokenImg} profile={profile}/>
            <View style={styles.content}>
                <View style={styles.section}>
                    <Summary summary={summary} style={viewStyles} />
                    <Skills skills={profile.skills} pagebreak/>
                </View>
                <View style={styles.section}>
                    <Experience style={viewStyles} experiences={experiences}/>
                    <Education style={viewStyles} educations={educations} pageBreak={true}/>
                    <Reference references={profile.references} />
                </View>
            </View>
        </Page>
    )
}

/**
 * Page 2 of CV
 */
// const Page2:React.FC<IPage> = (props) => {
//     return (
//         <Page size="A4" style={styles.page}>
//             <View style={styles.content}>
//                 <Education />
//             </View>
//         </Page>
//     )
// }

const CVContent:React.FC<{user:IUser, cv:ICV}> = ({user, cv}) => (
    <Document>
    <Page1 user={user} cv={cv}/>
    {/* <Page2 user={user} cv={cv}/> */}
</Document>
)

const PdfComp:React.FC<{user:IUser, token:string}> = ({user, token}) => {

    const cv = useCV(token, user.cvId);
    const { profile, educations, experiences } = cv
    const { tokenImg } = user;

    return profile && educations && experiences ? (
    <div>
        {/* <PDFViewer>
            <CVContent user={user} cv={cv}/>
        </PDFViewer> */}
        <PDFDownloadLink document={<CVContent user={user} cv={cv}/>}>
            Download
        </PDFDownloadLink>
    </div>
    ) : (
        <div>
            Error
        </div>
    );
}

export const Pdf = hot(module)(PdfComp);