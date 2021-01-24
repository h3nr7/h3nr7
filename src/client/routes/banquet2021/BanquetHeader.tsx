import * as React from 'react';
import { Container, SimpleLink, A } from '../../styles/common.styles';
import { Typography, Grid } from '@material-ui/core';
import { 
    TopInfoGrid, MemberGrid, 
    TitleGrid, TeamGrid, TeamStandingGridContainer,
    Unit } from './Banquet2021.styles';
import { 
    useBanquetLeaderboard, useBanquetTeams, 
    useBanquetClubStats, useBanquetTeamStandings 
} from '../../helper/banquetHooks';
import { calHrMinSecFromSecs, calKmFromMeters } from '../../helper/dateTimeFormat';
import { IBanquetSummaryActivity, IBanquetTeam, IBanquetTeamStandings } from '../../../shared/interfaces/banquet.interface';
import { dayCountdown } from './Bankquet.helper';
import { ILeaderboardResponse } from 'strava-service';
import { StravaSummaryActivity } from '../../components/stravaActivity';


export const BanquetHeader: React.FC<{}> = ({ children }) => {

    return (
        <Grid container>
            <TitleGrid item sm={10} md={9}>
                <Typography variant='h3'>LFTC Bankuet 2021</Typography>
                <Typography variant='body1'><SimpleLink to="/lftc/bankuet2021">Main page</SimpleLink> {children}</Typography>
            </TitleGrid>
            <Grid item sm={2} md={3} />
        </Grid>
    )
}