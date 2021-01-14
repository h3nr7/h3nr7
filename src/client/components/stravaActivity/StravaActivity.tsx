import * as React from 'react';
import { Grid } from '@material-ui/core';
import { IActivity } from 'strava-service';
import {
    Container,
    Title,
    Date,
    Icon,
    IconDiv,
    ContentDiv,
    DataBox,
    Unit,
    Desc
} from './StravaActivity.styles';
import * as Moment from 'moment';
import swim from '../../assets/swim.svg';
import bike from '../../assets/bike.svg';
import run from '../../assets/run.svg';
import { calHrMinSecFromSecs, calKmFromMeters } from '../../helper/dateTimeFormat';


export const StravaActivity:React.FC<IActivity> = ({
    stravaId,
    name,
    type,
    start_date,
    distance,
    elapsed_time,
    total_elevation_gain,
    children
}) => {

    let iconSrc;
    let showDistance;
    let showUnit;
    let showElevation = Math.round(total_elevation_gain);    

    const [hours, minutes, secs] = calHrMinSecFromSecs(elapsed_time);

    switch(type) {
        case 'VirtualRide':
        case 'Ride':
            iconSrc = bike;
            showDistance = calKmFromMeters(distance);
            showUnit = 'km';
            break;
        case 'Swim':
            iconSrc= swim;
            showDistance = Math.round(distance);
            showUnit = 'm';
            break;
        case 'VirtualRun':
        case 'Run':
            iconSrc = run;
            showDistance = calKmFromMeters(distance);
            showUnit = 'km';
            break;
    }
    return (
        <Container>
            <IconDiv>{iconSrc && <Icon src={iconSrc} />}</IconDiv>
            <ContentDiv>
                <Grid container>
                    <Grid item xs={12}>
                        <Title>{children && `(${children}) - `}{name}</Title>
                        <Date>{Moment(start_date).format('YYYY-MM-DD')}</Date>
                        <Grid container>
                            <Grid item xs={12} sm={6} md={4} lg={3}>
                                <DataBox><Desc>distance</Desc> {showDistance}<Unit>{showUnit}</Unit></DataBox>
                            </Grid>
                            {showElevation > 0 && (
                                <Grid item xs={12} sm={6} md={4} lg={3}>
                                    <DataBox><Desc>elevation</Desc> {showElevation}<Unit>m</Unit></DataBox>
                                </Grid>
                            )}
                            <Grid item xs={12} sm={6} md={4} lg={3}>
                                <DataBox>
                                    <Desc>time</Desc>{' '}
                                    {hours > 0 && (<>{hours}<Unit>h</Unit>{' '}</>)}
                                    {minutes > 0 && (<>{minutes}<Unit>m</Unit>{' '}</>)}
                                    {secs > 0 && (<>{secs}<Unit>s</Unit></>)}
                                </DataBox>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </ContentDiv>
        </Container>
    );
}