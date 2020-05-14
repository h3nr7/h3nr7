import * as React from "react";
import { hot } from "react-hot-loader";

import { AppContainer, AppContent } from './styles/app.styles';
import { Head } from './components/head';
import { Foot } from './components/foot';


const AppComponent: React.StatelessComponent<{}> = (props) => {

    return (
        <AppContainer>
            <Head />
            <AppContent>
            {props.children}
            </AppContent>
        </AppContainer>
    );

};

export const App = hot(module)(AppComponent);



