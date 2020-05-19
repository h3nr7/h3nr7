import * as React from "react";
import { hot } from "react-hot-loader";
import { animateScroll } from 'react-scroll';
import { useLocation } from "react-router-dom";

import { AppContainer, AppContent } from './styles/app.styles';
import { Head } from './components/head';
import { Foot } from './components/foot';


const AppComponent: React.StatelessComponent<{}> = (props) => {

    const location = useLocation();

    // scroll back to top when route changes
    React.useEffect(() => {
        animateScroll.scrollToTop({
            duration: 800,
            delay: 250,
            smooth: "easeInOutQuart"
        });
    }, [location]);

    return (
        <AppContainer>
            <AppContent>
            {props.children}
            </AppContent>
        </AppContainer>
    );

};

export const App = hot(module)(AppComponent);



