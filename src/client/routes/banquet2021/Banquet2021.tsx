import * as React from 'react';
import { Container, SimpleLink } from '../../styles/common.styles';
import { Typography, Grid } from '@material-ui/core';
import { 
    TopInfoGrid, MemberGrid, 
    TitleGrid, TeamGrid,
    Unit } from './Banquet2021.styles';
import { BanquetMember } from './BanquetMember';

export const Banquet:React.FC<{}> = () => {

    return (
        <Container>
            <Grid container>
                <TitleGrid sm={10} md={9}>
                    <Typography variant='h3'>LFTC Banquet 2021</Typography>
                    <Typography variant='body1'>Charity event</Typography>
                </TitleGrid>
                <Grid sm={2} md={3} />
            </Grid>

            <Grid container>
                <Grid sm={12} md={3} lg={5}>
                    <Grid container>
                        <TeamGrid xs={12} sm={6} md={12}>
                            <Typography variant='h4'>Team</Typography>
                            <Typography variant='body1'>Caffeiene Chasers</Typography>
                        </TeamGrid>
                        <MemberGrid xs={12} sm={6} md={12}>
                            <Typography variant='h4'>Members</Typography>
                            <Typography variant='body1'>Elle</Typography>
                            <Typography variant='body1'>Caffeiene Chasers</Typography>
                            <Typography variant='body1'>Reynold Li</Typography>
                            <Typography variant='body1'>Henry Ho</Typography>
                        </MemberGrid>
                    </Grid>
                </Grid>
                <Grid sm={12} md={9} lg={7}>
                    <Grid container>
                        <TopInfoGrid xs={12} sm={6}>
                            <Typography variant='h4'>Total distance</Typography>
                            <Typography variant='h1'>200<Unit>km</Unit></Typography>
                        </TopInfoGrid>
                        <TopInfoGrid xs={12} sm={6}>
                            <Typography variant='h4'>Total elevation</Typography>
                            <Typography variant='h1'>2000<Unit>m</Unit></Typography>
                        </TopInfoGrid>
                        <TopInfoGrid xs={12} sm={6}>
                            <Typography variant='h4'>Total Time</Typography>
                            <Typography variant='h1'>12<Unit>h</Unit> 30<Unit>m</Unit></Typography>
                        </TopInfoGrid>
                        <TopInfoGrid xs={12} sm={6}>
                            <Typography variant='h4'>Total Days</Typography>
                            <Typography variant='h1'>3<Unit>/</Unit> 30</Typography>
                        </TopInfoGrid>
                        <Grid xs={12}>
                            <Typography variant='h4'>members</Typography>
                            <Grid container>
                                <Grid sm={12} md={12}>
                                    <BanquetMember />
                                </Grid>
                                <Grid sm={12} md={12}>
                                    <BanquetMember />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

        </Container>
    );
}

