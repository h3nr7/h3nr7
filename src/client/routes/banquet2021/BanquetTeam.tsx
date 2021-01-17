import * as React from 'react';
import { Container, SimpleLink } from '../../styles/common.styles';
import { Typography, Grid } from '@material-ui/core';
import { 
    TopInfoGrid, MemberGrid, 
    TitleGrid, TeamGrid,
    Unit } from './Banquet2021.styles';
import { BanquetMember } from './BanquetMember';
import { useBanquetTeamStats, useBanquetOneTeam } from '../../helper/apiHooks';
import { useParams } from 'react-router-dom';
import { calHrMinSecFromSecs, calKmFromMeters } from '../../helper/dateTimeFormat';
import { StravaActivity } from '../../components/stravaActivity';
import { IActivity } from 'strava-service';
import { RestrictedRoute } from '../restricted.routes';
import { IBanquetActivity } from '../../../shared/interfaces/banquet.interface';
import { dayCountdown } from './Bankquet.helper';

export const BanquetTeam:React.FC<{}> = () => {
    
    const { id } = useParams<{id:string}>();
    const team = useBanquetOneTeam(id);
    const stats = useBanquetTeamStats(id);
    const { name } = team || {};
    const { _id, members, totDistance, totElevation, totTime, activities } = stats || {};

    const [daysLeft, totDays] = dayCountdown();


    const [hours, minutes, secs] = calHrMinSecFromSecs(totTime);
    const showTotDistance = calKmFromMeters(totDistance);
    const showTotElevation = Math.round(totElevation);

    const memObj:Record<number, { username:string }> = members && members.reduce((acc, post) => {
        let { stravaId, ...rest } = post;
        return {...acc, [stravaId]: {...rest}};
    }, {});

    console.log(stats, activities);


    return (
        <Container>
            <Grid container>
                <TitleGrid item sm={10} md={9}>
                    <Typography variant='h3'>LFTC Bankuet 2021</Typography>
                    <Typography variant='body1'><SimpleLink to='/lftc/bankuet2021'>Main page</SimpleLink> {'>'} Teams {'>'} {name}</Typography>
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
                    {(totDistance && totElevation && totTime) ? (
                        <Grid container>
                            <TopInfoGrid item xs={12} sm={6}>
                                <Typography variant='h4'>Total distance</Typography>
                                <Typography variant='h1'>
                                    {showTotDistance}<Unit>km</Unit>
                                    </Typography>
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
                                <Typography variant='h4'>Active days</Typography>
                                <Typography variant='h1'>{daysLeft}<Unit>/</Unit> {totDays}</Typography>
                            </TopInfoGrid>
                            <Grid item xs={12}>
                                <Typography variant='h4'>Recent activities</Typography>
                                {activities && activities.map((a:IBanquetActivity) => {
                                    return (<StravaActivity {...a}>{memObj[a.athlete.id].username}</StravaActivity>)
                                })}
                            </Grid>
                        </Grid>
                    ) : (
                        <>
                            <Typography variant='body2'>Not yet available : - /</Typography>
                            <SimpleLink to='/lftc/bankuet2021'>Back...</SimpleLink>
                        </>
                    )}
                </Grid>
            </Grid>

        </Container>
    );
}

