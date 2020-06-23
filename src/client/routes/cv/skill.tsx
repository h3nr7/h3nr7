import * as React from 'react'
import { pdfStyles as styles } from './cv.styles'
import { Text, View } from '@react-pdf/renderer';

export const Skills = () => (
    <View style={styles.section}>
        <Text style={[styles.title, { paddingBottom: 5 }]}>Skills</Text>
        <Text style={styles.h6}>Ribeye </Text>
        <Text style={styles.p}>Strip steak corned beef shank, rump sausage chicken tail tenderloin pork loin swine. Pork rump turducken alcatra leberkas jowl picanha beef cupim. </Text>

    </View>
)