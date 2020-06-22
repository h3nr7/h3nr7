import * as React from 'react';
import { PDFViewer, Page, Font, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { hot } from 'react-hot-loader';
import { Switch, Route, useParams } from 'react-router-dom';
import { Pdf } from './Pdf'; 
import { getCV, getTokenUser } from '../../services/api';
import { Typography } from '@material-ui/core';
import { IUser } from '../../../shared/interfaces/user.interface';

const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        fontFamily: 'rift-soft'
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    }
});


const initialUser:IUser = {
    firstName: null,
    lastName: null,
    email: null,
    cvId: null,
    exp: null
}

const CVComp:React.FC<{}> = (props) => {

    const { token } = useParams();
    const [user, setUser] = React.useState<IUser>(initialUser);
    React.useEffect(() => {
        async function fetchCV() {
            const found = await getTokenUser(token);
            setUser(found);
        }
        fetchCV();
    }, [token])

    const { firstName, lastName, exp } = user;
    const expDate = new Date(exp);
    return (
        <div>
            
            <Typography variant='h3'>Hello <br/>{firstName} {lastName}</Typography>
            <Typography variant='body2'>{expDate.toLocaleDateString("en-GB", {  
                                // weekday: 'long',
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                            })}</Typography>
            {user.email && token ? (
                <Switch>
                    <Route exact path="/cv/:token/pdf" render={() => <Pdf user={user} token={token}/>} />
                </Switch>
            ) : <div />}
        </div>
    );
}

export const CV = hot(module)(CVComp);