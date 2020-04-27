import * as React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ParallaxProvider } from 'react-scroll-parallax';
import { App } from "./app";
import { hot } from "react-hot-loader";


const AppRouterComponent: React.StatelessComponent<{}> = () => {
    return (
        <ParallaxProvider>
            <BrowserRouter>
                <App>
                    <Switch>

                    </Switch>
                </App>
            </BrowserRouter>
        </ParallaxProvider>
    );
};

export const AppRouter = hot(module)(AppRouterComponent);