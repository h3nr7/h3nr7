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
                <SubTitleGrid item xs={12}>
                    <Typography variant='h3'>Henry Ho</Typography>
                </SubTitleGrid>
                <Grid item xs={12}>
                    <Grid container>
                        <Grid item xs={12} md={3}>
                            
                                <Grid container>
                                    <Grid item xs={4} md={3}>Distance</Grid>
                                    <MemberDataGrid item xs={8} md={6}><Typography variant='body1'>200<SmallUnit>km</SmallUnit></Typography></MemberDataGrid>
                                    <Grid item xs={'auto'} md={3} />
                                </Grid>
                            
                                <Grid container>
                                    <Grid item xs={4} md={3}>Elevation</Grid>
                                    <MemberDataGrid item xs={8} md={6}><Typography variant='body1'>2000<SmallUnit>m</SmallUnit></Typography></MemberDataGrid>
                                    <Grid item xs={'auto'} md={3} />
                                </Grid>
            
                                <Grid container>
                                    <Grid item xs={4} md={3}>Time</Grid>
                                    <MemberDataGrid item xs={8} md={6}><Typography variant='body1'>12<SmallUnit>h</SmallUnit> 24<SmallUnit>m</SmallUnit></Typography></MemberDataGrid>
                                    <Grid item xs={'auto'} md={3} />
                                </Grid>
                        </Grid>
                        <Grid item xs={12} md={9}>

                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

        </MembeContainer>
    )
}