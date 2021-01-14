import * as React from 'react';
import { hot } from 'react-hot-loader';
import { Container, SimpleLink, A } from '../../styles/common.styles';
import { Img, UpdateButton, MobileUpdateButton, ActivityGrid, Snackbar, Toast } from './Strava.styles';
import { Grid, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useStravaActivities, useStravaMe } from '../../helper/apiHooks';
import * as Moment from 'moment';
import { StravaActivity } from '../../components/stravaActivity';

export const StravaComp = () => {

    const me = useStravaMe();
    const [isOpen, setIsOpen] = React.useState(false);
    let { username, firstname, lastname, stravaId, profile } = me || {};
    const [saveActivity, setSaveActivity] = React.useState(false);
    const startDate = Moment().subtract(4, 'weeks').format('YYYY-MM-DD');
    const endDate = Moment().format('YYYY-MM-DD');
    const activities = useStravaActivities(startDate, endDate, saveActivity, 200);  
    const sycnHandler = (e:React.MouseEvent<HTMLButtonElement>) => {
        setSaveActivity(true);
    }

    React.useEffect(() => {
        if(saveActivity) {
            setIsOpen(true);
            setSaveActivity(false);
        }
    }, [activities]);

    return (
        <>
            <Container>
                {stravaId && (
                    <Grid container>
                        <Grid item xs={2} sm={3} md={2}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <Img src={profile} />
                                </Grid>
                                <Grid item xs={12}>
                                    <UpdateButton onClick={sycnHandler}>Sync</UpdateButton>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={1} sm='auto' />
                        <Grid item xs={9} sm={9} md={10}>
                            <Typography variant='h3'>{username}</Typography>
                            <Typography variant='body1'>Greetings {firstname} {lastname}, this page is pulling your latest activites from the past 3 weeks in Strava. 
                            You can find and edit them from you <A href={`https://www.strava.com/athletes/${stravaId}`} target="strava">profile page</A>.</Typography>
                            <Typography variant='body1'>
                                If you are particitipating with an events that I am tracking, please click sync below in order to update your data into our database.
                            </Typography>
                            <MobileUpdateButton onClick={sycnHandler}>Sync</MobileUpdateButton>
                        </Grid>
                        <ActivityGrid item xs={12}>
                            <Grid container>
                                <Grid item xs='auto' sm={3} md={2}/>
                                <Grid item xs={12} sm={9} md={10}>
                                { activities && activities.map(data => (
                                    <>
                                    <StravaActivity {...data} />
                                    </>
                                ))}
                                </Grid>
                            </Grid>
                        </ActivityGrid>
                    </Grid>
                )}
            </Container>
            <Snackbar 
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={isOpen} 
                autoHideDuration={3000} 
                onClose={() => setIsOpen(false)}>
                <Toast>
                    <span style={{ 
                        fontSize: '0.75rem'
                    }}>&#10084;</span> Strava data synced! 
                </Toast>
            </Snackbar>
        </>
    )
}
