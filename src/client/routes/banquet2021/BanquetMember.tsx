import * as React from 'react';
import { MembeContainer } from './Banquet2021.styles';
import { Typography, Grid } from '@material-ui/core';
import { 
    TopInfoGrid, MemberGrid, 
    SubTitleGrid, TeamGrid, MemberDataGrid,
    SmallUnit } from './Banquet2021.styles';

export const BanquetMember:React.FC<{}> = ({}) => {

    return (
        <MembeContainer>
            <Grid container>
                <SubTitleGrid xs={12}>
                    <Typography variant='h3'>Henry Ho</Typography>
                </SubTitleGrid>
                <Grid xs={12}>
                    <Grid container>
                        <Grid xs={12} md={3}>
                            <Typography variant='body1'>
                                <Grid container>
                                    <Grid xs={4} md={3}>Distance</Grid>
                                    <MemberDataGrid xs={8} md={6}>200<SmallUnit>km</SmallUnit></MemberDataGrid>
                                    <Grid xs={'auto'} md={3} />
                                </Grid>
                            </Typography>
                            <Typography variant='body1'>
                                <Grid container>
                                    <Grid xs={4} md={3}>Elevation</Grid>
                                    <MemberDataGrid xs={8} md={6}>2000<SmallUnit>m</SmallUnit></MemberDataGrid>
                                    <Grid xs={'auto'} md={3} />
                                </Grid>
                            </Typography>
                            <Typography variant='body1'>
                                <Grid container>
                                    <Grid xs={4} md={3}>Time</Grid>
                                    <MemberDataGrid xs={8} md={6}>12<SmallUnit>h</SmallUnit> 24<SmallUnit>m</SmallUnit></MemberDataGrid>
                                    <Grid xs={'auto'} md={3} />
                                </Grid>
                            </Typography>
                        </Grid>
                        <Grid xs={12} md={9}>

                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

        </MembeContainer>
    )
}