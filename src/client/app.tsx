import * as React from "react";
import { hot } from "react-hot-loader";
import { animateScroll } from 'react-scroll';
import { useLocation } from "react-router-dom";
import { Theme, ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import brandedTheme from './styles/brandedTheme';
import banquetTheme from './styles/banquetTheme';
import CssBaseline from '@material-ui/core/CssBaseline';


import { AppContainer, AppContent } from './styles/app.styles';
import { ThemeProvider } from "styled-components";


interface IApp {

}

const AppComponent: React.FC<IApp> = (props) => {

    const location = useLocation();
    const { pathname } = location;
    // scroll back to top when route changes
    React.useEffect(() => {
        animateScroll.scrollToTop({
            duration: 800,
            delay: 250,
            smooth: "easeInOutQuart"
        });
    }, [pathname]);

    let theme:Theme;
    // special for banquet2021 link
    let subPathname = pathname.match(/\/lftc\/bankuet2021/g);

    if(!subPathname) {
        theme = brandedTheme({});
    } else {
        theme = banquetTheme({});
    }

    // switch(pathname) {
    //     case '/strava/banquet2021/':
    //         theme = banquetTheme({});
    //         break;
    //     default:
    //         theme = brandedTheme({});
    //         break;
    // }

    return (
        <MuiThemeProvider theme={theme}>
            <ThemeProvider theme={theme}>
            <CssBaseline>
                <AppContainer>
                    <AppContent>
                    {props.children}
                    </AppContent>
                </AppContainer>
            </CssBaseline>
            </ThemeProvider>
        </MuiThemeProvider>
    );

};

export const App = hot(module)(AppComponent);



