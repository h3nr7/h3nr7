import * as React from 'react';
import { Container, SimpleLink } from '../../styles/common.styles';
import { Typography, Grid } from '@material-ui/core';
import { 
    TopInfoGrid, MemberGrid, 
    TitleGrid, TeamGrid, ImgGrid, Img, Unknown,
    Unit, 
    MiniImg} from './Banquet2021.styles';
import { useBanquetTeamStats, useBanquetOneTeam, useBanquetTeamStandings, useBanquetTeams } from '../../helper/banquetHooks';
import { useParams } from 'react-router-dom';
import { calHrMinSecFromSecs, calKmFromMeters } from '../../helper/dateTimeFormat';
import { StravaActivity } from '../../components/stravaActivity';
import { IActivity } from 'strava-service';
import { RestrictedRoute } from '../restricted.routes';
import { IBanquetActivity } from '../../../shared/interfaces/banquet.interface';
import { dayCountdown } from './Bankquet.helper';

import { BanquetHeader } from './BanquetHeader';

export const BanquetMember:React.FC<{}> = ({}) => {
    const { id } = useParams<{id:string}>();
    const teams = useBanquetTeams();
    
    const [daysSofar, totDays, weeksSofar, totWeeks] = dayCountdown();
    const { leaderboard, teamsLeaderboard } = useBanquetTeamStandings(weeksSofar as number)

    const { firstname, lastname, stravaId, profile, weekTotDistance, weekTotElevation, weekTotMovingTime } = leaderboard && leaderboard.find(m => m.stravaId === Number(id)) || {};
    const fullname = firstname && lastname ? `${firstname} ${lastname}` : '';

    const athleteTeam = teams && teams.find(t => t.members.find(m => m.stravaId === stravaId));
    const { name, members, _id } = athleteTeam || {};
    const otherMembers = members && members.filter(m => m.stravaId !== stravaId);

    const [hours, minutes, secs] = calHrMinSecFromSecs(weekTotMovingTime);
    const showTotDistance = calKmFromMeters(weekTotDistance);
    const showTotElevation = Math.round(weekTotElevation);


    return (
        <Container>
            <BanquetHeader> {'>'} <SimpleLink to={`/lftc/bankuet2021/teams/${_id}`}>{name}</SimpleLink> {'>'} {fullname}</BanquetHeader>
            <Grid container>
                <Grid item sm={12} md={3} lg={5}>
                    <Grid container>
                        <TeamGrid item xs={12} sm={6} md={12}>
                            <Typography variant='h4'>Athlete</Typography>
                            <Typography variant='body1'>{fullname}</Typography>
                        </TeamGrid>
                        <TeamGrid item xs={12} sm={6} md={12}>
                            <Typography variant='h4'>Team</Typography>
                            <Typography variant='body1'>{name}</Typography>
                        </TeamGrid>
                        <MemberGrid item xs={12} sm={6} md={12}>
                            <Typography variant='h4'>Teammates</Typography>
                            { otherMembers && otherMembers.map(m => (
                                <Typography key={`mem_${m.stravaId}`} variant='body1'>
                                    <SimpleLink to={`/lftc/bankuet2021/members/${m.stravaId}`}>{m.firstname} {m.lastname}</SimpleLink>
                                    </Typography>
                            )) }
                        </MemberGrid>
                    </Grid>
                </Grid>
                <Grid item sm={12} md={9} lg={7}>
                    <ImgGrid>
                        {
                            profile ? <MiniImg src={profile} /> :
                                (firstname && lastname) ? 
                                    <Unknown>{firstname[0]}{lastname[0]}</Unknown> : null
                        }
                    </ImgGrid>
                    {(weekTotDistance && weekTotElevation && weekTotMovingTime) ? (
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
                                <Typography variant='h1'>{daysSofar}<Unit>/</Unit> {totDays}</Typography>
                            </TopInfoGrid>
                            <Grid item xs={12}>
                                {/* <Typography variant='h4'>Recent activities</Typography>
                                {activities && activities.map((a:IBanquetActivity, index: number) => {
                                    return (<StravaActivity key={`strava_activity_${a._id}`} {...a}>{memObj[a.athlete.id].username}</StravaActivity>)
                                })} */}
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
    )
}