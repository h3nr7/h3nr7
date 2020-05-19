import * as React from "react";
import { hot } from "react-hot-loader";
import { BrowserRouter, Route } from "react-router-dom";
import { ParallaxProvider } from 'react-scroll-parallax';
import { StyledAnimatedSwitch } from './routes.styles';

import { Navi } from '../components/navi';
import { App } from "../app";
import { Home } from './home';
import { Article } from './article';
import { About }from './about';
import { Archive } from './archive';
import { NotFound } from './notfound';

const AppRouterComponent: React.StatelessComponent<{}> = () => {


    return (
        <ParallaxProvider>
            <BrowserRouter>
                <Navi />
                <App>
                    <StyledAnimatedSwitch
                        atEnter={{ opacity: 0, offset: -100 }}
                        atLeave={{ opacity: 0, offset: -100 }}
                        atActive={{ opacity: 1, offset: 0 }}
                        mapStyles={(styles)=>{
                            return {
                                opacity: styles.opacity,
                                transform: `translateX(${styles.offset}%)`
                            }
                        }}>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/article/:id" component={Article} />
                        <Route exact path="/about" component={About} />
                        <Route exact path="/archive" component={Archive} />
                        <Route component={NotFound} />
                    </StyledAnimatedSwitch>
                </App>
            </BrowserRouter>
        </ParallaxProvider>
    );
};

export const AppRouter = hot(module)(AppRouterComponent);