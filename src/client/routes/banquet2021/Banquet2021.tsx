import * as React from 'react';
import { Container, SimpleLink, A } from '../../styles/common.styles';
import { Typography, Grid } from '@material-ui/core';
import { 
    TopInfoGrid, MemberGrid, 
    TitleGrid, TeamGrid, TeamStandingGridContainer,
    Unit } from './Banquet2021.styles';
import { useBanquetLeaderboard, useBanquetTeams, useBanquetClubStats, useBanquetTeamStandings } from '../../helper/apiHooks';
import { calHrMinSecFromSecs, calKmFromMeters } from '../../helper/dateTimeFormat';
import { IBanquetSummaryActivity, IBanquetTeam, IBanquetTeamStandings } from '../../../shared/interfaces/banquet.interface';
import { dayCountdown } from './Bankquet.helper';
import { ILeaderboardResponse } from 'strava-service';
import { StravaSummaryActivity } from '../../components/stravaActivity';

export const Banquet:React.FC<{}> = () => {
    
    const { latestActivities } = useBanquetClubStats() || {};
    const [daysSofar, totDays, weeksSofar, totWeeks] = dayCountdown();
    const mainLeaderboard = useBanquetLeaderboard(weeksSofar as number);
    const { leaderboard, teamsLeaderboard } = useBanquetTeamStandings(weeksSofar as number)
    const teams = useBanquetTeams();
    const { totDistance, totElevation, totTime, data } = mainLeaderboard || {};
    const leaderboardTop10 = leaderboard && leaderboard.slice(0, 10);


    const [hours, minutes, secs] = calHrMinSecFromSecs(totTime);
    const showTotDistance = calKmFromMeters(totDistance);
    const showTotElevation = Math.round(totElevation);

    return (
        <Container>
            <Grid container>
                <TitleGrid item sm={10} md={9}>
                    <Typography variant='h3'>LFTC Bankuet 2021</Typography>
                    <Typography variant='body1'>Main page</Typography>
                </TitleGrid>
                <Grid item sm={2} md={3} />
            </Grid>

            <Grid container>
                <Grid item xs={12} sm={3} md={3} lg={4}>
                    <Grid container>
                        <TopInfoGrid item xs={12} sm={12} md={12} lg={6}>
                            <Typography variant='h4'>Current Week</Typography>
                            <Typography variant='h3'>{weeksSofar}<Unit>/</Unit> {totWeeks}</Typography>
                        </TopInfoGrid>   
                        <TopInfoGrid item xs={12} sm={12} md={12} lg={6}>
                            <Typography variant='h4'>Week total distance</Typography>
                            <Typography variant='h3'>{showTotDistance}<Unit>km</Unit></Typography>
                        </TopInfoGrid>
                        {/* <TopInfoGrid item xs={12} sm={12} md={12} lg={6}>
                            <Typography variant='h4'>Elevations</Typography>
                            <Typography variant='h3'>{showTotElevation}<Unit>m</Unit></Typography>
                        </TopInfoGrid> */}
                        <TopInfoGrid item xs={12} sm={12} md={12} lg={6}>
                            <Typography variant='h4'>Week elapsed time</Typography>
                            <Typography variant='h3'>{hours}<Unit>h</Unit> {minutes}<Unit>m</Unit></Typography>
                        </TopInfoGrid>
                        <TopInfoGrid item xs={12} sm={12} md={12} lg={6}>
                            <Typography variant='h4'>Active days</Typography>
                            <Typography variant='h3'>{daysSofar}<Unit>/</Unit> {totDays}</Typography>
                        </TopInfoGrid>
                        <TopInfoGrid item xs={12} sm={12} md={12} lg={12}>
                            <Typography variant='h4'>Week top 10 individual</Typography>
                            <TeamStandingGridContainer>
                            { leaderboardTop10 && leaderboardTop10.map((m:ILeaderboardResponse, index:number) => (
                                    <Grid item key={`mem_${m.stravaId}`} xs={12} sm={11}>
                                        <Grid container>
                                            <Grid item xs={1} sm={1} md={1}>
                                                {index+1}. 
                                            </Grid>
                                            <Grid item xs={8} sm={8} md={8}>
                                                <Typography variant='body1' style={{paddingRight: '2rem'}}>
                                                    <A target={`strava_${m.stravaId}`} href={`https://www.strava.com/athletes/${m.stravaId}`}>{m.firstname} {m.lastname}</A>
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                )) } 
                            </TeamStandingGridContainer>  
                        </TopInfoGrid>                      
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={9} md={9} lg={8}>
                    <Grid container>
                        <MemberGrid item xs={12} sm={12} md={12}>
                            <Typography variant='h4'>INfo</Typography>
                            <Typography variant='body1'>
                                Join a reality- virtual team of up to 4 to ride 2021km, and help LFTC raise £2021 for Bankuet 
                                (10th January- 14th February 2021) who are launching a pop-up food bank in Hackney 
                                (our home borough) on the 18th January to meet increasing demand in the area. 
                            </Typography>
                        </MemberGrid>
                        <TeamGrid item xs={12} sm={12} md={12}>
                            <Typography variant='h4'>This week team standings</Typography>
                            <TeamStandingGridContainer>
                                { teamsLeaderboard && teamsLeaderboard.map((m:IBanquetTeamStandings, index:number) => (
                                    <Grid item key={`mem_${m._id}`} xs={12} sm={11} md={8} lg={7}>
                                        <Grid container>
                                            <Grid item xs={1} sm={1} md={1}>
                                                {index+1}. 
                                            </Grid>
                                            <Grid item xs={8} sm={8} md={8}>
                                                <Typography variant='body1' style={{paddingRight: '2rem'}}>
                                                    <SimpleLink to={`/lftc/bankuet2021/teams/${m._id}`}>{m.name}</SimpleLink>
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={3} sm={3} md={2} style={{textAlign: 'right'}}>
                                                <Typography variant='body2'>{Math.round(calKmFromMeters(m.teamTotDistance))}km</Typography>
                                            </Grid>
                                            <Grid item xs='auto' sm='auto' md={1} />
                                        </Grid>
                                    </Grid>
                                )) } 
                            </TeamStandingGridContainer>                   
                        </TeamGrid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography variant='h4'>Recent activities</Typography>

                            {latestActivities && latestActivities.map((a:IBanquetSummaryActivity) => {
                                return (<StravaSummaryActivity key={`latestact_${a._id}`} {...a} />)
                            })}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

        </Container>
    );
}

