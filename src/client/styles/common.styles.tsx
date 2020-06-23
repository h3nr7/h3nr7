import styled from 'styled-components';
import { Grid, Typography } from '@material-ui/core';

/**
 * default container
 */
export const Container = styled(Grid)`
    width: 100vw;
    padding: 0 1.6rem;
`

export const Section = styled(Grid)`
    margin: 15px 0 0;
`

export const Paragraph = styled(Typography)`
    padding-bottom: 1rem;
`