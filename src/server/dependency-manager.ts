import * as bunyan from "bunyan";
import * as http from "http";
import * as mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

class DependencyManager {
    public Initialise = async (server: http.Server,
                               logger: bunyan,
                               logFilePath: string,
                               firstRun: boolean) => {
    // TODO: Manage dependencies in here
    // such as databases and other services.

        mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        })
        .then(() => { console.log('Mongoose connected successfully!')})
        .catch((e:any) => { console.error('Mongoose connection error', e) });
    }
}

const dependencyManager: DependencyManager =  new DependencyManager();

// Only ever have one dependency manager
export function Dependencies() {
    return dependencyManager;
}