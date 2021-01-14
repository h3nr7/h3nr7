import * as React from 'react';
import { Container, SimpleLink } from '../../styles/common.styles';
import { Typography, Grid } from '@material-ui/core';
import { 
    TopInfoGrid, MemberGrid, 
    TitleGrid, TeamGrid,
    Unit } from './Banquet2021.styles';
import { BanquetMember } from './BanquetMember';
import { useBanquetTeamStats } from '../../helper/apiHooks';
import { useParams } from 'react-router-dom';
import { calHrMinSecFromSecs, calKmFromMeters } from '../../helper/dateTimeFormat';
import { StravaActivity } from '../../components/stravaActivity';
import { IActivity } from 'strava-service';
import { RestrictedRoute } from '../restricted.routes';

const MAX_NUM_TO_SHOW = 8;

export const Banquet:React.FC<{}> = () => {
    
    const { id } = useParams<{id:string}>();
    const stats = useBanquetTeamStats(id);
    const { _id, name, members, totDistance, totElevation, totTime, activities } = stats || {};

    const outActivities:IActivity[] = activities && (activities.slice(0, Math.min(MAX_NUM_TO_SHOW, Math.max(MAX_NUM_TO_SHOW, activities.length))) as unknown as IActivity[]);
    const [hours, minutes, secs] = calHrMinSecFromSecs(totTime);
    const showTotDistance = calKmFromMeters(totDistance);
    const showTotElevation = Math.round(totElevation);

    const memObj:Record<number, { username:string }> = members && members.reduce((acc, post) => {
        let { stravaId, ...rest } = post;
        return {...acc, [stravaId]: {...rest}};
    }, {});


    return (
        <Container>
            <Grid container>
                <TitleGrid item sm={10} md={9}>
                    <Typography variant='h3'>LFTC Bankuet 2021</Typography>
                    <Typography variant='body1'>Charity event</Typography>
                </TitleGrid>
                <Grid item sm={2} md={3} />
            </Grid>

            <Grid container>
                <Grid item sm={12} md={3} lg={5}>
                    <Grid container>
                        <TeamGrid item xs={12} sm={6} md={12}>
                            <Typography variant='h4'>Team</Typography>
                            <Typography variant='body1'>{name}</Typography>
                        </TeamGrid>
                        <MemberGrid item xs={12} sm={6} md={12}>
                            <Typography variant='h4'>Members</Typography>
                            { members && members.map(m => (
                                <Typography key={`mem_${m._id}`} variant='body1'>{m.firstname} {m.lastname}</Typography>
                            )) }
                        </MemberGrid>
                    </Grid>
                </Grid>
                <Grid item sm={12} md={9} lg={7}>
                    <Grid container>
                        <TopInfoGrid item xs={12} sm={6}>
                            <Typography variant='h4'>Total distance</Typography>
                            <Typography variant='h1'>{showTotDistance}<Unit>km</Unit></Typography>
                        </TopInfoGrid>
                        <TopInfoGrid item xs={12} sm={6}>
                            <Typography variant='h4'>Total elevation</Typography>
                            <Typography variant='h1'>{showTotElevation}<Unit>m</Unit></Typography>
                        </TopInfoGrid>
                        <TopInfoGrid item xs={12} sm={6}>
                            <Typography variant='h4'>Total Time</Typography>
                            <Typography variant='h1'>{hours}<Unit>h</Unit> {minutes}<Unit>m</Unit></Typography>
                        </TopInfoGrid>
                        <TopInfoGrid item xs={12} sm={6}>
                            <Typography variant='h4'>Total Days</Typography>
                            <Typography variant='h1'>3<Unit>/</Unit> 30</Typography>
                        </TopInfoGrid>
                        <Grid item xs={12}>
                            <Typography variant='h4'>Recent activities</Typography>
                            {/* <Grid container>
                                <Grid item sm={12} md={12}>
                                    <BanquetMember />
                                </Grid>
                                <Grid item sm={12} md={12}>
                                    <BanquetMember />
                                </Grid>
                            </Grid> */}
                            {outActivities && outActivities.map(a => {
                                return (<StravaActivity {...a}>{memObj[a.athlete.id].username}</StravaActivity>)
                            })}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

        </Container>
    );
}

