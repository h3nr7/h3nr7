import * as React from 'react';
import { Container, SimpleLink, A } from '../../styles/common.styles';
import { Typography, Grid } from '@material-ui/core';
import { 
    TopInfoGrid, MemberGrid, Paragraph,
    TitleGrid, TeamGrid, TeamStandingGridContainer,
    Unit, MainOutlinedButton,
    HeroGrid,
    HeroImg} from './Banquet2021.styles';
import { 
    useBanquetLeaderboard, useBanquetTeams, 
    useBanquetClubStats, useBanquetTeamStandings 
} from '../../helper/banquetHooks';
import { calHrMinSecFromSecs, calKmFromMeters } from '../../helper/dateTimeFormat';
import { BanquetHeader } from './BanquetHeader';
import { IBanquetSummaryActivity, IBanquetTeam, IBanquetTeamStandings } from '../../../shared/interfaces/banquet.interface';
import { dayCountdown } from './Bankquet.helper';
import { ILeaderboardResponse } from 'strava-service';
import { StravaSummaryActivity } from '../../components/stravaActivity';
import { useParams } from 'react-router-dom';
import { getQueryByName } from '../../helper/routerHooks';
export const Banquet:React.FC<{}> = () => {
    
    const week = getQueryByName('week');

    const { latestActivities } = useBanquetClubStats() || {};
    const [daysSofar, totDays, weeksSofar, totWeeks] = dayCountdown();
    const curWeek = week || weeksSofar;
    const mainLeaderboard = useBanquetLeaderboard(curWeek as number);
    const { leaderboard, teamsLeaderboard } = useBanquetTeamStandings(curWeek as number)
    const teams = useBanquetTeams();
    const { totDistance, totElevation, totTime, data } = mainLeaderboard || {};
    const leaderboardTop10 = leaderboard && leaderboard.slice(0, 10);


    const [hours, minutes, secs] = totTime ? calHrMinSecFromSecs(totTime) : [0,0,0];
    const showTotDistance = totDistance ? calKmFromMeters(totDistance) : 0;
    const showTotElevation = totElevation ? Math.round(totElevation) : 0;

    const isShowLatestActivities = (curWeek === weeksSofar) && latestActivities && latestActivities.length > 0;

    return (
        <Container>
            <BanquetHeader />

            <Grid container>
                <Grid item xs={12} sm={3} md={3} lg={4}>
                    <Grid container>
                        <TopInfoGrid item xs={12} sm={12} md={12} lg={6}>
                            <Typography variant='h4'>Current Week</Typography>
                            <Typography variant='h3'>{curWeek}<Unit>/</Unit> {totWeeks}</Typography>
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
                                                    <SimpleLink to={`/lftc/bankuet2021/athletes/${m.stravaId}`}>{m.firstname} {m.lastname}</SimpleLink>
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                )) } 
                                <Grid item xs={12} sm={11}>
                                    <Grid container>
                                        <Grid item xs={1} sm={1} md={1} />
                                        <Grid item xs={8} sm={8} md={8}>
                                            <Typography variant='body1' style={{paddingRight: '2rem'}}>
                                                ...
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} sm={11}>
                                    <Grid container>
                                        <Grid item xs={1} sm={1} md={1} />
                                        <Grid item xs={8} sm={8} md={8}>
                                            <Typography variant='body1' style={{paddingRight: '2rem'}}>
                                                <SimpleLink to={'/lftc/bankuet2021/athletes'}>full list of athletes</SimpleLink>
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </TeamStandingGridContainer>  
                        </TopInfoGrid>                      
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={9} md={9} lg={8}>
                    <Grid container>
                        <HeroGrid item xs={10} sm={10} md={10} lg={10}>
                            <HeroImg src={'https://images.squarespace-cdn.com/content/v1/5c879a2bfb18207eec330764/1610122973698-ZDT2SK8ZIUKLLRIR2AKP/ke17ZwdGBToddI8pDm48kJnMC2i9apNV2mpj19O9Qd4UqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8N_N4V1vUb5AoIIIbLZhVYxCRW4BPu10St3TBAUQYVKcmHpETfta7BKfPfnQk2NglVdGpn_EkxcjmJBK41ed9hjm6ZnOiZa_CENYWJwCUADz/Hero+image+11.png?format=750w'} />
                        </HeroGrid>
                        <MemberGrid item xs={12} sm={12} md={12}>
                            <Typography variant='h4'>Info</Typography>
                            <Paragraph>
                                Join a reality- virtual team of up to 4 to ride 2021km, and help LFTC raise £2021 for Bankuet 
                                (10th January- 14th February 2021) who are launching a pop-up food bank in Hackney 
                                (our home borough) on the 18th January to meet increasing demand in the area.  If you want to support the team in their amazing efforts you can make a donation to the club fundraising campaign here: 
                            </Paragraph>
                            <Paragraph>
                                If you want to support the team in their amazing efforts you can make a donation to the club fundraising campaign here.  Select LFTC as the campaign code under additional information at checkout.
                            </Paragraph>
                            <Paragraph>    
                                <MainOutlinedButton onClick={() => window.open("//bankuet.co.uk/hackneypopup", 'bankuet')}>Hackney Pop-up Foodbank</MainOutlinedButton>
                            </Paragraph>
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
                    {isShowLatestActivities && (
                        <Grid container>
                            <Grid item xs={12}>
                                <Typography variant='h4'>Recent activities</Typography>

                                {latestActivities && latestActivities.map((a:IBanquetSummaryActivity) => {
                                    return (<StravaSummaryActivity key={`latestact_${a._id}`} {...a} />)
                                })}
                            </Grid>
                        </Grid>
                    )}
                </Grid>
            </Grid>

        </Container>
    );
}

