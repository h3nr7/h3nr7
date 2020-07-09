import * as React from 'react';
import { StyleSheet } from '@react-pdf/renderer';
import { hot } from 'react-hot-loader';
import { useParams } from 'react-router-dom';
import { Pdf } from './Pdf'; 
import { getTokenUser } from '../../services/api';
import { Typography } from '@material-ui/core';
import { IUser } from '../../../shared/interfaces/user.interface';
import { displayDate, calDaysLeft } from '../../helper/dateTimeFormat';
import { Container, Section } from '../../styles/common.styles';
import { TitleSpan, Footer, indexStyles as styles } from './cv.styles';



// initial state for set user
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

    const { firstName, lastName, cvId, exp, date } = user;
    const today = new Date();
    const endDate = new Date(Number(exp)*1000);
    const startDate = new Date(Number(date)*1000);
    const daysLeft = calDaysLeft(today, endDate);

    return (
        <div>
            <Container>
                <Typography variant='h3'>Hi {firstName},</Typography>
                <Section>
                    <Typography variant='h5'><TitleSpan>CvId: </TitleSpan>{cvId}</Typography>
                    <Typography variant='h5'><TitleSpan>Expires: </TitleSpan>{displayDate(Number(exp)*1000)}</Typography>
                </Section>
                <Section>
                <p>Thank you for your interest and please feel free to download my CV with the link below.
                    It was issued on {displayDate(Number(date)*1000)} and accessible for the next {daysLeft} days.</p>
                </Section>
            </Container>
            <Footer>
                {user.email && token ? (<Pdf user={user} token={token}/>) : <div />}
            </Footer>
        </div>
    );
}

export const CV = hot(module)(CVComp);