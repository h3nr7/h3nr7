import * as path from 'path';
import * as fs from 'fs';
import * as bunyan from 'bunyan';

export const logfilePath = path.join(__dirname, '..', '..', '..', 'logs');

if(!fs.existsSync(logfilePath)) {
    fs.mkdirSync(logfilePath);
}

// create logger
export const logger = bunyan.createLogger({
    name: process.env.APP_LOGGER_NAME || 'h3nr7_default_logger',
    streams: [
        {
            level: 'info',
            path: path.join(logfilePath, 'app.log')
        }
    ]
});
