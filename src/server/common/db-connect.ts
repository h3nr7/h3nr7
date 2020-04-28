import * as express from 'express';
import * as mongoose from 'mongoose';
import * as bunyan from "bunyan";

const MONGODB_URI = process.env.MONGODB_URI;

// Connect Mongo DB
export function dbConnect(logger:bunyan):void {
    try {
        mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        });
        logger.info('Mongoose connected successfully!');
    } catch(e) {
        logger.warn('Mongoose connect failed: ', e.message);
    }
}