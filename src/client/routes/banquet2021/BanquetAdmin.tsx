import * as React from 'react';
import { Container, SimpleLink } from '../../styles/common.styles';
import { Typography, Grid } from '@material-ui/core';
import { 
    TopInfoGrid, MemberGrid, 
    TitleGrid, TeamGrid,
    Unit } from './Banquet2021.styles';
import { BanquetMember } from './BanquetMember';
import { useBanquetTeamStats, useBanquetOneTeam } from '../../helper/banquetHooks';
import { useParams } from 'react-router-dom';
import { calHrMinSecFromSecs, calKmFromMeters } from '../../helper/dateTimeFormat';
import { StravaActivity } from '../../components/stravaActivity';
import { IActivity } from 'strava-service';
import { RestrictedRoute } from '../restricted.routes';
import { IBanquetActivity } from '../../../shared/interfaces/banquet.interface';
import { dayCountdown } from './Bankquet.helper';

export const BanquetAdmin:React.FC<{}> = () => {



    return (
        <Container>

        </Container>
    );
};
