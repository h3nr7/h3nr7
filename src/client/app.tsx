import * as React from "react";
import { hot } from "react-hot-loader";

import { Head } from './components/head/head';
import { Foot } from './components/foot/foot';


const AppComponent: React.StatelessComponent<{}> = (props) => {

    return (
        <div>
            <Head />
            {props.children}
            <Foot />
        </div>
    );

};

export const App = hot(module)(AppComponent);



