import * as React from 'react'
import { pdfStyles as styles } from './cv.styles'
import { Text, View } from '@react-pdf/renderer';
import { IReference, IReferences } from '../../../shared/interfaces/references';

const ReferenceItem:React.FC<IReference> = ({name, company, email, contact}) => (
    <View>
        <Text style={[styles.h5, {paddingBottom: 2}]}>{company}</Text>
        <Text style={{paddingBottom: 2, color: 'rgb(100, 100, 100)'}}>{name}</Text>
        <Text style={[styles.p, {paddingBottom: 0}]}>{email}</Text>
        { contact ? <Text style={styles.p}>{contact}</Text> : null}
    </View>
)

export const Reference:React.FC<{references?: IReferences}> = ({references}) => {
    return !references ? null : <View>
        <Text style={[styles.title, { paddingBottom: 5 }]}>Reference</Text>
        {  references && references.map(item => <ReferenceItem {...item}/>) }
    </View> 
}
