import * as express from 'express';
import * as bunyan from "bunyan";
import * as redis from 'redis';
import * as ConnectRedis from 'connect-redis';
import * as session from 'express-session';

const REDIS_URI = process.env.REDIS_URI;
const SESSION_SECRET = process.env.SESSION_SECRET;
// Connect Redis PubSub
export function redisConnect(app:express.Application, logger:bunyan): void {
    try {
        let RedisStore:ConnectRedis.RedisStore = ConnectRedis(session);
        let redisClient:redis.RedisClient = redis.createClient({
            url: REDIS_URI
        });

        app.use(session({
            store: new RedisStore({ client: redisClient }),
            secret: SESSION_SECRET,
            saveUninitialized: false,
            resave: false
        }));

        
        logger.info('Redis connected successfully!');
    } catch(e) {
        logger.warn('redis session connect failed: ', e.message);
    }
}
