import * as React from 'react';
import { Container, SimpleLink } from '../../styles/common.styles';
import { Typography, Grid } from '@material-ui/core';
import { 
    TopInfoGrid, MemberGrid, 
    TitleGrid, TeamGrid,
    Unit } from './Banquet2021.styles';
import { useBanquetStats, useBanquetTeams } from '../../helper/apiHooks';
import { calHrMinSecFromSecs, calKmFromMeters } from '../../helper/dateTimeFormat';
import { StravaSummaryActivity } from '../../components/stravaActivity';
import { IBanquetSummaryActivity } from '../../../shared/interfaces/banquet.interface';
import { dayCountdown } from './Bankquet.helper';

export const Banquet:React.FC<{}> = () => {
    
    const stats = useBanquetStats();
    const teams = useBanquetTeams();
    const { totDistance, totElevation, totTime, latestActivities } = stats || {};

    const [daysLeft, totDays] = dayCountdown();

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
                            <Typography variant='h4'>Distance so far</Typography>
                            <Typography variant='h3'>{showTotDistance}<Unit>km</Unit></Typography>
                        </TopInfoGrid>
                        <TopInfoGrid item xs={12} sm={12} md={12} lg={6}>
                            <Typography variant='h4'>Elevations</Typography>
                            <Typography variant='h3'>{showTotElevation}<Unit>m</Unit></Typography>
                        </TopInfoGrid>
                        <TopInfoGrid item xs={12} sm={12} md={12} lg={6}>
                            <Typography variant='h4'>Time spent</Typography>
                            <Typography variant='h3'>{hours}<Unit>h</Unit> {minutes}<Unit>m</Unit></Typography>
                        </TopInfoGrid>
                        <TopInfoGrid item xs={12} sm={12} md={12} lg={6}>
                            <Typography variant='h4'>Active days</Typography>
                            <Typography variant='h3'>{daysLeft}<Unit>/</Unit> {totDays}</Typography>
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
                            <Typography variant='h4'>Team</Typography>
                            <Grid container>
                            { teams && teams.map(m => (
                                <Grid item key={`mem_${m._id}`} xs={12} sm={6} md={4}>
                                    <Typography variant='body1' style={{paddingRight: '2rem'}}>
                                        <SimpleLink to={`/lftc/bankuet2021/teams/${m._id}`}>{m.name}</SimpleLink>
                                    </Typography>
                                </Grid>
                            )) }      
                            </Grid>                  
                        </TeamGrid>
                    </Grid>
                    <Grid container>
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
                            {latestActivities && latestActivities.map((a:IBanquetSummaryActivity) => {
                                return (<StravaSummaryActivity {...a} />)
                            })}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

        </Container>
    );
}

