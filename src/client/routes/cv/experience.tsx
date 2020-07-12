import * as React from 'react';
import { IExperience } from '../../../shared/interfaces/experiences.interface';
import { Text, View } from '@react-pdf/renderer';
import { pdfStyles as styles } from './cv.styles'
import { displayMonthYearDate } from '../../helper/dateTimeFormat';

export const ExperienceItem:React.FC<IExperience> = ({companyName ,role ,isCurrent ,startDate ,endDate ,content}) => (
    <View style={{marginBottom: 10}}>
        <View style={{flexDirection: 'row', marginBottom: 2}}>
            <Text style={[styles.h5, {paddingBottom: 0, paddingRight: 2}]}>{companyName}</Text>
            <Text style={[styles.h6, {paddingBottom: 0, textTransform: 'capitalize', color: 'rgb(100, 100, 100)'}]}>
                {`{ ${displayMonthYearDate(startDate)} - ${isCurrent ? 'current' : displayMonthYearDate(endDate)} }`}
            </Text>
        </View>
        <Text style={{paddingBottom: 10, color: 'rgb(100, 100, 100)'}}>{role}</Text>
        <Text style={styles.p}>{content}</Text>
    </View>
)

export const Experience:React.FC<{experiences:IExperience[], style?:any }> = ({experiences, style}) => (
    <View style={style}>
        <Text style={[styles.title, { paddingBottom: 5 }]}>Experience</Text>
        {experiences && experiences.map((item) => (
            <ExperienceItem {...item} />
        ))}
    </View>
)