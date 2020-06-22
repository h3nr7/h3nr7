import * as path from 'path';
import * as express from 'express';
import * as favicon from 'serve-favicon';

import { viewController } from '../controller/view.controller';
import { usersController } from '../controller/users.controller';
import { errorHandler } from '../middleware/error.middleware';
import { notFoundHandler } from '../middleware/not-found.middleware';
import { contentController } from './content.controller';
import { authController } from './auth.controller'; 

/**
 * Register all routes
 */
export function registerRoutes(app:express.Application):void {

    app.use(favicon(path.join(__dirname, "..", "..", "..", "public", "favicon-32x32.png")));
    // serve public assets
    app.use("/public", express.static(path.join(__dirname, "..", "..", "..", "public")));

    // Authentication handler
    app.use('/auth', authController);
    //add api controller routes here
    app.use('/api/content', contentController);
    app.use('/api/user', usersController);
    // error and not found handler for api
    app.use('/api', errorHandler);
    app.use('/api', notFoundHandler);
    // add view controller routes here
    app.use('/', viewController);
}

