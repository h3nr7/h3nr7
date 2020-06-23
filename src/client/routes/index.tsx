import * as React from "react";
import { hot } from "react-hot-loader";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import { ParallaxProvider } from 'react-scroll-parallax';
import { StyledAnimatedSwitch } from './routes.styles';
import { Navi } from '../components/navi';
import { App } from "../app";
import { Home } from './home';
import { Article } from './article';
import { About }from './about';
import { Archive } from './archive';
import { User } from "./user";
import { NotFound } from './notfound';
import { Burger } from "../components/burger";
import { CV } from "./cv";
import { CVForm } from "./cvform"


const AppRouterComponent: React.StatelessComponent<{}> = () => {


    return (
        <ParallaxProvider>
            <BrowserRouter>
                <Navi />
                <Burger />
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
                        <Route path="/user" component={User} />
                        <Route exact path="/about" component={About} />
                        <Route exact path="/about/cv/request" component={CVForm} />
                        <Route exact path="/about/cv/:token" component={CV} />
                        <Route exact path="/archive" component={Archive} />
                        {/* Redirects and Notfound */}
                        <Redirect exact path="/article" to="/" />
                        <Route component={NotFound} />
                    </StyledAnimatedSwitch>
                </App>
            </BrowserRouter>
        </ParallaxProvider>
    );
};

export const AppRouter = hot(module)(AppRouterComponent);