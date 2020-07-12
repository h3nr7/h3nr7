import * as React from 'react'
import { pdfStyles as styles } from './cv.styles'
import ReactPDF, { Text, View } from '@react-pdf/renderer';


export const Summary:React.FC<{summary:string, style: ReactPDF.Style}> = ({summary, style}) => (
    <View style={style}>
        <Text style={[styles.title, { paddingBottom: 5 }]}>Summary</Text>
        <Text style={styles.h5}>About</Text>
        <Text style={styles.p}>{summary}</Text>
    </View> 
)

/* <View break>
    <Text style={[styles.title, { paddingBottom: 5 }]}>Skill</Text>
    <Text style={styles.h6}>Programming</Text>
    <Text style={styles.p}>Venison turducken short ribs frankfurter, flank bacon ribeye picanha kielbasa burgdoggen brisket salami. Pork chuck leberkas, chicken ball tip turkey t-bone burgdoggen doner ribeye ham hock cow sirloin kielbasa. 
    
    Burgdoggen shank picanha tenderloin shankle pancetta. Jerky bacon rump shank shoulder, tail ground round tenderloin short ribs porchetta ribeye kielbasa t-bone. Corned beef prosciutto ham jerky leberkas, chuck swine ball tip porchetta.</Text>
</View> */