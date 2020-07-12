import * as React from 'react'
import { IProfile } from '../../../shared/interfaces/profiles.interface'
import { pdfStyles as styles } from './cv.styles'
import { Text, View, Image } from '@react-pdf/renderer';

/**
 * Header with contact info
 */
export const PageHeader:React.FC<{img:string, profile:IProfile}> = ({img, profile}) => (
    <View style={styles.heading}>
        <View style={{flexFlow: 9, width: 490, alignSelf: 'flex-start'}}>
            <Text style={[styles.h1, { marginBottom: 0}]}>{profile.displayName}</Text>
            <Text style={[styles.h3, { marginBottom: 18 }]}>{profile.title}</Text>
            <Text style={[styles.info, { color: 'rgb(0,0,0)'}]}>{profile.email}</Text>
            <Text style={[styles.info, { marginBottom: 18 }]}>{profile.contact ? profile.contact : ' '}</Text>
            <Text style={styles.info}>{profile.address1 ? profile.address1 : ' '}</Text>
            <Text style={styles.info}>{profile.address2 ? profile.address2 : ' '}</Text>
            <Text style={styles.info}>{profile.city ? profile.city : ' '}</Text>
            <Text style={styles.info}>{profile.postcode ? profile.postcode : ' '}</Text>
        </View>
        <View style={{flexFlow: 1, alignSelf: 'flex-end', top:0}}>
            <Image src={img} style={{marginTop: -143, marginLeft: -18, width:80, height: 80}}/>
        </View>
    </View>
)