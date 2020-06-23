import styled from 'styled-components'
import { Grid } from '@material-ui/core'

export const TextInput = styled.input`
    display: block;
    border: none;
    font-family: 'rift-soft';
    font-weight: 300;
    font-size: 2rem;
    min-width: 200px;
    min-height: 40px;
    color: white;
    background: none;
    background: linear-gradient(to left, white 40%, rgba(255, 255, 255, 0) 0%);
    background-position: bottom;
    background-repeat: repeat-x;
    background-size: 10px 1px, 1px 8px;
    margin-bottom: 1rem;
    &:focus {
        outline: none;
    }
`

export const CTASection = styled(Grid)`
    margin-top: 20px;
`