import { Schema, Document, model } from 'mongoose';
import { ISummaryActivity } from 'strava-service';

export const BanquetmanualactivitySchema = new Schema({
    resource_state: Number,
    athlete:{
        resource_state: Number,
        firstname: String,
        lastname: String
    },
    name: String,
    distance: Number,
    moving_time: Number,
    elapsed_time: Number,
    total_elevation_gain: Number,
    type: String,
    createdAt: Date,
    updatedAt: Date
});

export interface IBanquetmanualactivityDocument extends ISummaryActivity, Document {

}

export const BanquetmanualactivityModel = model<IBanquetmanualactivityDocument>("Banquetmanualactivity", BanquetmanualactivitySchema);

