import * as passport from "passport";
import * as express from 'express';
import * as refresh from 'passport-oauth2-refresh';
import { StravaStrategy } from '../auth/strava.strategy';

export function initAuth(app:express.Application) {

    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(user, done) {
        done(null, user);
    });

    passport.use(StravaStrategy);
    refresh.use(StravaStrategy);

    app.use(passport.initialize());
    app.use(passport.session());

}

