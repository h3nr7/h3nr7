import * as React from 'react';
import ReactPDF, { 
    PDFDownloadLink, Image , Page, Font, Text, View, Document, StyleSheet 
} from '@react-pdf/renderer';
import { hot } from 'react-hot-loader';
import { PDFViewer } from './cv.styles';

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

const styles = StyleSheet.create({
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

const img="data:image/png;base64,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";
const Header = () => (
    <View style={styles.heading}>
        <View style={{flexFlow: 9, width: 490, alignSelf: 'flex-start'}}>
            <Text style={[styles.h1, { marginBottom: 0}]}>h3nr7 YP Ho</Text>
            <Text style={[styles.h3, { marginBottom: 18 }]}>Lead Creative Technologist</Text>
            <Text style={[styles.info, { color: 'rgb(0,0,0)'}]}>me@h3nr7.com</Text>
            <Text style={[styles.info, { marginBottom: 18 }]}>+44 7751 224 919</Text>
            <Text style={styles.info}>4 Ruffin House</Text>
            <Text style={styles.info}>Roseberry Place</Text>
            <Text style={styles.info}>London</Text>
            <Text style={styles.info}>E8 3GB</Text>
        </View>
        <View style={{flexFlow: 1, alignSelf: 'flex-end', top:0}}>
            <Image src={img} style={{marginTop: -153, marginLeft: 0, width:80, height: 80}}/>
        </View>
    </View>
)

const Summary = () => (
    <View style={styles.section}>
        <View>
            <Text style={[styles.title, { paddingBottom: 5 }]}>Summary</Text>
            <Text style={styles.h6}>About</Text>
            <Text style={styles.p}>Bacon ipsum dolor amet pork chop salami buffalo shank.  Spare ribs turkey beef porchetta, landjaeger turducken ham hock cupim short loin burgdoggen meatball. Tongue short ribs ham hock fatback. Salami ham pastrami, sirloin filet mignon brisket venison turducken short loin beef ribs capicola. Ribeye t-bone flank shank. 
            Chislic salami short ribs tri-tip beef ribs picanha. Burgdoggen brisket sirloin cow chuck tail. Ham hock filet mignon cupim, ground round turkey bresaola shankle ribeye chislic.</Text>
        </View> 
        <View break>
            <Text style={[styles.title, { paddingBottom: 5 }]}>Skill</Text>
            <Text style={styles.h6}>Programming</Text>
            <Text style={styles.p}>Venison turducken short ribs frankfurter, flank bacon ribeye picanha kielbasa burgdoggen brisket salami. Pork chuck leberkas, chicken ball tip turkey t-bone burgdoggen doner ribeye ham hock cow sirloin kielbasa. 
            
            Burgdoggen shank picanha tenderloin shankle pancetta. Jerky bacon rump shank shoulder, tail ground round tenderloin short ribs porchetta ribeye kielbasa t-bone. Corned beef prosciutto ham jerky leberkas, chuck swine ball tip porchetta.</Text>
        </View>
    </View>
)

interface IExperienceItem {
    name: string
    title: string
    date: string,
    content: string
}

const ExperienceItem:React.FC<IExperienceItem> = ({name, title, date, content}) => (
    <View style={{marginBottom: 10}}>
        <View style={{flexDirection: 'row', marginBottom: 2}}>
            <Text style={[styles.h6, {paddingBottom: 0, paddingRight: 2}]}>{name}</Text>
            <Text style={[styles.h6, {paddingBottom: 0, color: 'rgb(100, 100, 100)'}]}> {`{ ${date} }`}</Text>
        </View>
        <Text style={{paddingBottom: 10, color: 'rgb(100, 100, 100)'}}>{title}</Text>
        <Text style={styles.p}>{content}</Text>
    </View>
)

const Experience = () => (
    <View style={styles.section}>
        <Text style={[styles.title, { paddingBottom: 5 }]}>Experience</Text>
        <ExperienceItem 
            name='Short loin tongue'
            date='Jun 2017'
            title='JavaScript & Node.js Web Engineer'
            content='Fatback jowl pancetta burgdoggen alcatra cow tail jerky.
            
            Meatloaf pork belly biltong venison pig fatback ham hock. Kielbasa strip steak picanha short loin sirloin t-bone bacon. Shankle bresaola filet mignon andouille t-bone landjaeger spare ribs ball tip pork belly jowl.'        
        />
        <ExperienceItem 
            name='Tongue short ribs'
            date='Feb 2014 -Mar 2014'
            title='Frankfurter beef'
            content='Burgdoggen shank picanha tenderloin shankle pancetta. Jerky bacon rump shank shoulder, tail ground round tenderloin short ribs porchetta ribeye kielbasa t-bone. Corned beef prosciutto ham jerky leberkas, chuck swine ball tip porchetta.'
        />
    </View>
)

const Skills = () => (
    <View style={styles.section}>
        <Text style={[styles.title, { paddingBottom: 5 }]}>Skills</Text>
        <Text style={styles.h6}>Ribeye </Text>
        <Text style={styles.p}>Strip steak corned beef shank, rump sausage chicken tail tenderloin pork loin swine. Pork rump turducken alcatra leberkas jowl picanha beef cupim. </Text>

    </View>
)

const EducationItem:React.FC<{}> = () => (
    <View>
        <Text style={[styles.title, { paddingBottom: 5 }]}>Education</Text>
        <Text style={styles.h6}>Spare ribs</Text>
        <Text style={styles.p}>Strip steak chislic porchetta, ribeye t-bone ham fatback pastrami chicken.</Text>
    </View>
)

const Education = () => (
    <View style={styles.section}>
        <EducationItem />
    </View>
)

const Page1:React.FC<{}> = (props) => {
    return (
        <Page size="A4" style={styles.page} rulerSteps={20}>
            <Header />
            <View style={styles.content}>
                <Summary />
                <Experience />
            </View>
            <View style={styles.content}>
                <Skills />
            </View>
        </Page>
    )
}

const Page2:React.FC<{}> = (props) => {
    return (
        <Page size="A4" style={styles.page}>
            <View style={styles.content}>
                
                <Education />
            </View>
        </Page>
    )
}

const PdfComp:React.FC<{}> = (props) => {

    return (
    <div>
        <PDFViewer>
            <Document>
                <Page1 />
                <Page2 />
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