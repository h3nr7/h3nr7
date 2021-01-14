import * as React from 'react'
import { pdfStyles as styles } from './cv.styles'
import ReactPDF, { Text, View } from '@react-pdf/renderer';
import { ISkills } from '../../../shared/interfaces/skills';

export const Skills:React.FC<{skills:ISkills, style?:ReactPDF.Styles, pagebreak?:boolean}> = ({skills, style, pagebreak}) => (
    <View style={style} break={pagebreak}>
        <Text style={[styles.title, { paddingBottom: 5 }]}>Skill</Text>
        {skills.map((obj) => {
            const [key, arr] = Object.entries(obj)[0];
            return (
                <div key={key}>
                    <Text style={[styles.h6, { textTransform:'uppercase', paddingBottom: 9 }]}>{key}</Text>
                    <View style={{ marginBottom: 35 }}>
                        {arr.map(o => (
                            <View style={{flexDirection: 'row'}}>
                                <View style={{display: 'flex', maxWidth: '3%'}}><Text style={styles.dot}>*</Text></View>
                                <View style={{display: 'flex', maxWidth: '97%'}}><Text style={styles.p}>{o}</Text></View>
                            </View>
                        ))}
                    </View>
                </div>
            )
        })}
    </View>
)