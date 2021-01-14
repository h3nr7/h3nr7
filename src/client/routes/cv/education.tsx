import * as React from 'react'
import ReactPDF, { Text, View } from '@react-pdf/renderer';
import { pdfStyles as styles } from './cv.styles'
import { IEducation } from '../../../shared/interfaces/education.interface';

/**
 * Items of education
 */
const EducationItem:React.FC<IEducation> = ({institute ,title ,isCurrent ,startDate ,endDate}) => (
    <View style={{marginBottom: 10}}>
        <Text style={[styles.h5, {paddingBottom: 2}]}>{institute}</Text>
        <Text style={{paddingBottom: 2, color: 'rgb(100, 100, 100)'}}>{title}</Text>
        <Text style={[styles.h6, {color: 'rgb(100, 100, 100)'}]}>
            {(new Date(startDate)).getFullYear()} - {isCurrent ? 'current' : (new Date(endDate)).getFullYear()}
        </Text>
    </View>
)

export const Education:React.FC<{educations: IEducation[], pageBreak?:boolean, style?:ReactPDF.Styles}> = ({educations, pageBreak, style}) => (
    <View style={style} break={pageBreak}>
        <Text style={[styles.title, { paddingBottom: 5 }]}>Education</Text>
        {educations.map((item) => <EducationItem {...item} />)}
    </View>
)