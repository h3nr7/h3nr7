import * as React from 'react'
import { hot } from 'react-hot-loader'
import { getQueryByName } from '../../helper/routerHooks'
import { Container, Paragraph, CTA } from '../../styles/common.styles'
import { TextInput, CTASection } from './cvform.styles'
import { Grid, Typography } from '@material-ui/core'

const CVFormComp:React.FC<{}> = () => {

    const cvid = getQueryByName('cvid')
    const firstNameRef = React.useRef()
    const lastNameRef = React.useRef()
    const emailRef = React.useRef()
    const [firstName, setFirstName] = React.useState(null);
    const [lastName, setLastName] = React.useState(null);
    const [email, setEmail] = React.useState(null);

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

    const submitHandler = () => {
        console.log({
            firstName, lastName, email
        })
    }

    return (
        <div>
            <Container container>
                <Grid item xs={12} sm={12} md={5}>
                    <Typography variant="h5" style={{ marginBottom:'0.5rem' }}>CV Request Form</Typography>
                    <TextInput ref={firstNameRef} onChange={onValueChange} placeholder={'First Name'}/>
                    <TextInput ref={lastNameRef} onChange={onValueChange} placeholder={'Last Name'}/>
                    <TextInput ref={emailRef} onChange={onValueChange} placeholder={'Email'}/>
                </Grid>
                <Grid item xs={12} sm={12} md={7}>
                <Typography variant="h5" style={{ marginBottom:'0.5rem' }}>What's next?</Typography>
                    <Paragraph variant="body2">
                        Thank you for your interest in finding out about myself and what I can offer.
                    </Paragraph>
                    <Paragraph variant="body2">
                        You will receive an email to a confirmation and download page.  
                        Your details will be encrypted into a QR code that is a part of my CV, and will not 
                        be stored anywhere else.  Hence, I will only be able to access the encrypted information if it
                        circles back to myself.
                    </Paragraph>
                    <Paragraph variant="body2">
                        It is therefore unique only with your digital footprint!
                    </Paragraph>
                </Grid>
            </Container>
            <CTASection>
                <CTA onClick={submitHandler}>Submit</CTA>
            </CTASection>
        </div>
    )
}

export const CVForm = hot(module)(CVFormComp)