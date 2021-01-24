import * as React from 'react';
import { Container, SimpleLink } from '../../styles/common.styles';
import { Typography, Grid } from '@material-ui/core';
import { 
    TopInfoGrid, MemberGrid, 
    TitleGrid, TeamGrid,
    Unit, ImgGrid, MiniImg, Unknown } from './Banquet2021.styles';
import { useBanquetTeamStats, useBanquetOneTeam, useBanquetTeamStandings } from '../../helper/banquetHooks';
import { useParams } from 'react-router-dom';
import { calHrMinSecFromSecs, calKmFromMeters } from '../../helper/timeDistanceHook';
import { StravaActivity } from '../../components/stravaActivity';
import { IActivity, ILeaderboardResponse } from 'strava-service';
import { RestrictedRoute } from '../restricted.routes';
import { IBanquetActivity, IBanquetMember, IBanquetTeam } from '../../../shared/interfaces/banquet.interface';
import { dayCountdown } from './Bankquet.helper';
import { BanquetHeader } from './BanquetHeader';

export const BanquetTeam:React.FC<{}> = () => {
    
    const { id } = useParams<{id:string}>();
    const [daysSofar, totDays, weeksSofar, totWeeks] = dayCountdown();

    const team = useBanquetOneTeam(id);
    const { leaderboard, teamsLeaderboard } = useBanquetTeamStandings(weeksSofar as number)



    const { name } = team || {};
    // const { _id, members, totDistance, totElevation, totTime, activities } = stats || {};

    const memObj:Record<number, ILeaderboardResponse> = leaderboard && leaderboard.reduce((acc:any, post:any) => {
        let { stravaId, ...rest } = post;
        if(stravaId)
        return {...acc, [stravaId]: {...rest}};
    }, {});

    interface IStats {
        totTime: number
        totDistance: number
        totElevation: number
        members: IBanquetMember[] & ILeaderboardResponse[]
    };

    const initStats:IStats = { totTime: 0, totDistance: 0, totElevation: 0, members:[] };

    const { totTime, totDistance, totElevation, members }  = (leaderboard && team && team.members) ? team.members.reduce<IStats>((prev:any, next:any, i:number) => {
        
        const { stravaId } = next;
        const found = memObj[stravaId];
        const memTotTime = found ? found.weekTotElapsedTime : 0;
        const memTotDistance = found ? found.weekTotDistance : 0;
        const memTotElevation = found ? found.weekTotElevation : 0;
        console.log(found);
        return {
            totTime: prev.totTime + memTotTime,
            totDistance: prev.totDistance + memTotDistance,
            totElevation: prev.totElevation + memTotElevation,
            members: [...prev.members, {
                ...next,
                ...found
            }]
        };
    }, initStats) : initStats;
    
    const [hours, minutes, secs] = calHrMinSecFromSecs(totTime);
    const showTotDistance = calKmFromMeters(totDistance);
    const showTotElevation = Math.round(totElevation);

    return (
        <Container>
            <BanquetHeader> {'>'} Teams {'>'} {name}</BanquetHeader>
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
                                <Typography key={`mem_${m.stravaId}`} variant='body1'>
                                    <SimpleLink to={`/lftc/bankuet2021/members/${m.stravaId}`}>{m.firstname} {m.lastname}</SimpleLink>
                                </Typography>
                            )) }
                        </MemberGrid>
                    </Grid>
                </Grid>
                <Grid item sm={12} md={9} lg={7}>
                    <ImgGrid>
                        {members && members.map(m => (m && m.profile) ? 
                            <MiniImg key={`members_${m.stravaId}`}  src={m.profile} /> : 
                            <Unknown key={`members_${m.stravaId}`}>{m.firstname[0]}{m.lastname[0]}</Unknown>
                        )}
                    </ImgGrid>
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
    );
}

