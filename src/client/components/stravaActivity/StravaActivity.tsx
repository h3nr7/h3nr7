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


export const StravaActivity:React.FC<IActivity> = ({
    stravaId,
    name,
    type,
    start_date,
    distance,
    elapsed_time,
    total_elevation_gain
}) => {

    let iconSrc;
    let showDistance;
    let showUnit;
    let showElevation = Math.round(total_elevation_gain);    
    let secs = elapsed_time;
    let minutes = Math.floor(secs / 60);
    secs = secs%60;
    let hours = Math.floor(minutes/60)
    minutes = minutes%60;

    switch(type) {
        case 'VirtualRide':
        case 'Ride':
            iconSrc = bike;
            showDistance = Math.round(distance/100)/10;
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
            showDistance = Math.round(distance/100)/10;
            showUnit = 'km';
            break;
    }
    return (
        <Container>
            <IconDiv>{iconSrc && <Icon src={iconSrc} />}</IconDiv>
            <ContentDiv>
                <Grid container>
                    <Grid item xs={12}>
                        <Title>{name}</Title>
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