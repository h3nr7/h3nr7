import * as React from 'react';
import { Container, SimpleLink } from '../../styles/common.styles';
import { Typography, Grid } from '@material-ui/core';
import { 
    TopInfoGrid, MemberGrid, 
    TitleGrid, TeamGrid, ImgGrid, Unknown,
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
import { getQueryByName } from '../../helper/routerHooks';

export const BanquetMemberList:React.FC<{}> = ({}) => {

    const [week, type] = getQueryByName(['week', 'type']);

    const standingType = type || 'distance';

    const [daysSofar, totDays, weeksSofar, totWeeks] = dayCountdown();
    const curWeek = week || weeksSofar;
    let { leaderboard, teamsLeaderboard } = useBanquetTeamStandings(curWeek as number);

    const weekDisplayTxt = curWeek === weeksSofar ? 'Current week' : `Week ${curWeek}/${totWeeks}`;

    switch(standingType) {
        case 'elevation':
            leaderboard = leaderboard && leaderboard.sort((a, b) => b.weekTotElevation - a.weekTotElevation);
            break;
    } 

    return (
        <Container>
            <BanquetHeader> {'>'} Athletes {standingType} standings</BanquetHeader>
            <Grid container>
                <Grid item xs={12} sm={12} md={3} lg={2}>
                    <TeamGrid item xs={12} sm={12} md={12}>
                        <Typography variant='h3'>Athletes {standingType} standings</Typography>
                        <Typography variant='h4'>{weekDisplayTxt}</Typography>
                        <Typography variant='body1' style={{ paddingTop: '1rem', paddingRight: '1rem' }}>
                            {standingType !== 'elevation' ?
                                <SimpleLink to={`/lftc/bankuet2021/athletes?type=elevation`}>Elevation standings</SimpleLink> :
                                <SimpleLink to={`/lftc/bankuet2021/athletes`}>Distance standings</SimpleLink>
                            }
                        </Typography>
                        {standingType !== 'elevation' && (
                            <Typography variant='body2' style={{ paddingTop: '1rem', paddingRight: '1rem' }}>
                                Request by <SimpleLink to={`/lftc/bankuet2021/athletes/11222747`}>Peter Kun</SimpleLink>. 
                                We can all thank him for this. 😂 
                            </Typography>
                        )}
                    </TeamGrid>
                </Grid>
                <Grid item xs={12} sm={12} md={9} lg={10}>
                    <Grid container>
                    {leaderboard && leaderboard.map((m, index) => {
                        const totDistance = m.weekTotDistance ? calKmFromMeters(m.weekTotDistance) : 0;
                        const totElevation = m.weekTotElevation ? Math.round(m.weekTotElevation) : 0;

                        const displayMetric = standingType === 'elevation' ? totElevation : totDistance;
                        const displayMetricUnit = standingType === 'elevation' ? 'm' : 'km';
                        return (
                            <Grid item key={`mem_${m.stravaId}`} xs={12} sm={11}>
                                <Grid container>
                                    <Grid item xs={3} sm={2} md={2}>
                                        <Typography variant='h1'>{index+1}. </Typography>
                                    </Grid>
                                    <Grid item xs={9} sm={10} md={10}>
                                        <Grid container>
                                            <Grid item xs={12}>
                                                <Typography variant='body1' style={{paddingRight: '2rem'}}>
                                                    <SimpleLink to={`/lftc/bankuet2021/athletes/${m.stravaId}`}>{m.firstname} {m.lastname}</SimpleLink>
                                                </Typography>
                                            </Grid>
                                            <Grid container>
                                                <TopInfoGrid item xs={6} sm={6}>
                                                    <Typography variant='h4'>Total {standingType}</Typography>
                                                    <Typography variant='h3'>
                                                        {displayMetric}<Unit>{displayMetricUnit}</Unit>
                                                    </Typography>
                                                </TopInfoGrid>
                                                <Grid item xs={6} sm={3} md={2} style={{ textAlign: 'right' }}>
                                                    {(m && m.profile) ? 
                                                        <MiniImg key={`members_${m.stravaId}`}  src={m.profile} /> : 
                                                        <Unknown key={`members_${m.stravaId}`}>{m.firstname[0]}{m.lastname[0]}</Unknown>
                                                    }
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        );
                    })}
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
}

