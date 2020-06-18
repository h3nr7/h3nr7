import * as express from 'express';
import * as bunyan from "bunyan";
import * as http from "http";
import * as sgMail from '@sendgrid/mail';


class DependencyManager {
    public Initialise = async (server: http.Server,
                               app: express.Application,
                               logger: bunyan,
                               logFilePath: string,
                               firstRun: boolean) => {
        // TODO: Manage dependencies in here
        // such as databases and other services.
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    }
}

const dependencyManager: DependencyManager =  new DependencyManager();

// Only ever have one dependency manager
export function Dependencies() {
    return dependencyManager;
}