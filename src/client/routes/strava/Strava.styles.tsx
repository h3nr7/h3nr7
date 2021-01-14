import { Grid } from '@material-ui/core';
import styled from 'styled-components';
import { Snackbar as MuiSnackbar, withStyles } from '@material-ui/core';
import { OutlinedButton } from '../../styles/common.styles';

export const ActivityGrid = styled(Grid)`
    && {
        ${props => props.theme.breakpoints.down('sm')} {
            margin-top: 4rem;
        }

        ${props => props.theme.breakpoints.up('sm')} {
            margin-top: 3rem;
        }
    }
`;

export const Img = styled.img`
    border-radius: 50px;

    ${props => props.theme.breakpoints.down('sm')} {
        width: 56px;
        height: 56px;
    }

    ${props => props.theme.breakpoints.up('sm')} {
        width: 100px;
        height: 100px;
    }

`;

export const Snackbar = withStyles({
    root: {
        padding: 0,
        margin: 0
    }
})(MuiSnackbar);

export const Toast = styled.div`
    background: white;
    padding: 0.5rem 4rem;
    border-radius: 2px;
    color: black;
    /* font-style: italic; */
`;

export const UpdateButton = styled(OutlinedButton)`
    margin-top: 1rem;
    box-sizing: border-box;

    ${props => props.theme.breakpoints.down('sm')} {
        display: none;
    }

    ${props => props.theme.breakpoints.up('sm')} {
        max-width: 100px;
        width: 100px;
    }
`;

export const MobileUpdateButton = styled(OutlinedButton)`
    box-sizing: border-box;

    ${props => props.theme.breakpoints.up('xs')} {
        max-width: 100px;
        width: 100px;
    }

    ${props => props.theme.breakpoints.up('md')} {
        display: none;
    }
`;