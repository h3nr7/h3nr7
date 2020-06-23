import * as React from 'react'
import { Text, View } from '@react-pdf/renderer';
import { pdfStyles as styles } from './cv.styles'

export const EducationItem:React.FC<{}> = () => (
    <View>
        <Text style={[styles.title, { paddingBottom: 5 }]}>Education</Text>
        <Text style={styles.h6}>Spare ribs</Text>
        <Text style={styles.p}>Strip steak chislic porchetta, ribeye t-bone ham fatback pastrami chicken.</Text>
    </View>
)

export const Education = () => (
    <View style={styles.section}>
        <EducationItem />
    </View>
)
