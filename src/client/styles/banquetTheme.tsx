import { createMuiTheme, ThemeOptions } from '@material-ui/core/styles';
import { defaultOptions } from './brandedTheme';


export const banquetOptions: ThemeOptions = {
    ...defaultOptions,
    typography: {
        fontFamily: [
            'titillium-web',
            // 'Roboto',
            'serif'
        ].join(','),
        body1: {
            fontFamily: [
                'titillium-web',
                'san-serif'
            ].join(','),
            fontWeight: 300,
            fontStyle: 'italic',
        },
        h1: {
            fontFamily: [
                'rift-soft',
                'san-serif'
            ].join(','),
            fontWeight: 300,
            fontStyle: 'italic',
            lineHeight: 1,
            letterSpacing: '-0.2rem'
        },
        h2: {
            fontSize: '2.75rem',
            fontFamily: [
                'rift-soft',
                'san-serif'
            ].join(','),
            fontWeight: 500,
            fontStyle: 'italic'
        },
        h3: {
            fontFamily: [
                'rift-soft',
                'san-serif'
            ].join(','),
            fontWeight: 300,
            fontStyle: 'italic'
        },
        h4: {
            fontFamily: [
                'rift-soft',
                // 'Roboto',
                'serif'
            ].join(','),
            fontSize: '1.2rem',
            // lineHeight: '1.2rem',
            // marginTop: '-0.2rem',
            fontWeight: 300,
            fontStyle: 'italic' ,
            color: 'rgb(120,120,120)'
        },
        h5: {
            fontFamily: [
                'rift-soft',
                // 'Roboto',
                'serif'
            ].join(','),
            fontWeight: 300,
            fontStyle: 'italic'
        },
        h6: {
            fontFamily: [
                'titillium-web',
                // 'Roboto',
                'serif'
            ].join(','),
            fontSize: '0.75rem',
            lineHeight: '1.2rem',
            marginTop: '-0.2rem',
            fontWeight: 300,
            // fontStyle: 'italic'
        }
    },
    palette: {
        ...defaultOptions.palette,
        text: {
            primary: "rgba(0, 0, 0, 0.87)",
            secondary: "rgba(0, 0, 0, 0.54)",
            disabled: "rgba(0, 0, 0, 0.38)",
            hint: "rgba(0, 0, 0, 0.38)"
        },
        background: {
            paper: "#FFFFFF",
            default: "#FFFFFF"
        }
    }
};

export default function banquetTheme(options: ThemeOptions) {
    return createMuiTheme({
        ...banquetOptions,
        ...options
    });
}