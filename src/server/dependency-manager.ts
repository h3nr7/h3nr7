import * as express from 'express';
import * as bunyan from "bunyan";
import * as http from "http";
import * as mongoose from 'mongoose';
class DependencyManager {
    public Initialise = async (server: http.Server,
                               app: express.Application,
                               logger: bunyan,
                               logFilePath: string,
                               firstRun: boolean) => {
        // TODO: Manage dependencies in here
        // such as databases and other services.
        // U7iFns1w04hUunft
        const uri = process.env.MONGODB_URI;
        mongoose.set('useFindAndModify', false);
        mongoose.set('useCreateIndex', true);
        mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});
        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function() {
            // we're connected!
            logger.info('Mongo DB connected');
        });
    }
}

const dependencyManager: DependencyManager =  new DependencyManager();

// Only ever have one dependency manager
export function Dependencies() {
    return dependencyManager;
}