import * as React from 'react'
import { hot } from 'react-hot-loader'
import { getQueryByName } from '../../helper/routerHooks'
import { Container, Paragraph, CTA } from '../../styles/common.styles'
import { TextInput, CTASection } from './cvform.styles'
import { Grid, Typography } from '@material-ui/core'
import { requestCV } from '../../services/api'
import { validateEmail } from '../../helper/validator' 
import { useHistory } from 'react-router-dom'

const CVFormComp:React.FC<{}> = () => {

    const cvId = getQueryByName('cvid')
    const history = useHistory();
    const firstNameRef = React.useRef()
    const lastNameRef = React.useRef()
    const emailRef = React.useRef()
    const [firstName, setFirstName] = React.useState(null);
    const [lastName, setLastName] = React.useState(null);
    const [email, setEmail] = React.useState(null);
    const [submitted, setSubmitted] = React.useState(false);
    const [submitError, setSubmitError] = React.useState(null);

    /**
     * on field change handler
     */
    const onValueChange = (evt:React.ChangeEvent<HTMLInputElement>) => {
        switch(evt.target) {
            case firstNameRef.current:
                setFirstName(evt.target.value)
                break
            case lastNameRef.current:
                setLastName(evt.target.value)
                break
            case emailRef.current:
                setEmail(evt.target.value)
                break
        }
    }

    /**
     * submit handler 
     */
    const submitHandler = async () => {
        setSubmitError(null);
        try {
            if(!cvId) throw new Error('URL ID is missing or invalid, please contact me for a valid request link')
            if(!firstName || !lastName || !email) throw new Error('Some fields are missing.  Please check and make sure all fields are filled in.')
            if(!validateEmail(email)) throw new Error('Email address is invalid, please check and try again.')

            const response = await requestCV({firstName, lastName, email, cvId});
            setSubmitted(true);
        } catch(e) {
            setSubmitted(false);
            setSubmitError(e.message);
        }
    }

    /**
     * reset
     */
    const resetHandler = () => {
        setSubmitted(false)
        setSubmitError(null)
    }

    /**
     * back
     */
    const backHandler = () => {
        history.push('/about')
    }

    return (
        <div>
            <Container container>
                {submitted ? (
                    <Grid item xs={12} sm={12} md={5}>
                        <Typography variant="h3" style={{ marginBottom:'0.5rem' }}>Thank you.</Typography>
                        <Paragraph variant="body2" style={{maxWidth: 400}}>
                            You should receive an email shortly.  Please check your junk box if it has taken too long.
                        </Paragraph>
                    </Grid>
                ) : submitError ? (
                    <Grid item xs={12} sm={12} md={5}>
                        <Typography variant="h3" style={{ maxWidth: 400, marginBottom:'0.5rem' }}>Oops... Something went wrong.</Typography>
                        <Paragraph variant="body2" style={{maxWidth: 400}}>
                            {submitError ? `${submitError}` : `Please check your details and try again later.`}
                        </Paragraph>
                    </Grid>
                ) : (
                    <Grid item xs={12} sm={12} md={5}>
                        <Typography variant="h5" style={{ marginBottom:'0.5rem' }}>CV Request Form</Typography>
                        <TextInput defaultValue={firstName} ref={firstNameRef} onChange={onValueChange} placeholder={'First Name'}/>
                        <TextInput defaultValue={lastName} ref={lastNameRef} onChange={onValueChange} placeholder={'Last Name'}/>
                        <TextInput defaultValue={email} ref={emailRef} onChange={onValueChange} placeholder={'Email'}/>
                    </Grid>
                )}

                <Grid item xs={12} sm={12} md={7}>
                <Typography variant="h5" style={{ marginBottom:'0.5rem' }}>What's next?</Typography>
                    <Paragraph variant="body2">
                        Thank you for your interest in finding out about myself and what I can offer.
                    </Paragraph>
                    <Paragraph variant="body2">
                        Once a valid request is made successfully, you will receive an email to a confirmation and download page.  
                        Your details will be encrypted into a QR code that is a part of my CV, and will not 
                        be stored anywhere else.  I will only be able to access the encrypted information if it
                        circles back to myself.
                    </Paragraph>
                    <Paragraph variant="body2">
                        It is therefore unique with your digital footprint!
                    </Paragraph>
                </Grid>
            </Container>
            {submitted ? (
                <CTASection>
                    <CTA onClick={backHandler}>Exit</CTA>
                </CTASection>
            ) : submitError ? (
                <CTASection>
                    <CTA onClick={resetHandler}>Retry</CTA>
                </CTASection>
            ) : (
                <CTASection>
                    <CTA onClick={submitHandler}>Submit</CTA>
                </CTASection>
            )}
        </div>
    )
}

export const CVForm = hot(module)(CVFormComp)