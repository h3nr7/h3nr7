import { Schema, Document, model } from 'mongoose';
import { IActivity } from 'strava-service';

export const ActivitySchema = new Schema({
    stravaId: Number,
    resource_state: Number,
    external_id: String,
    upload_id: Number,
    athlete: {
        id: Number,
        resource_state: Number
    },
    name: String,
    distance: Number,
    moving_time: Number,
    elapsed_time: Number,
    total_elevation_gain: Number,
    type: String,
    start_date: String,
    start_date_local: String,
    timezone: String,
    start_latlng: [Number, Number],
    end_latlng: [Number, Number],
    kudos_count: Number,
    photo_count: Number,
    map: Schema.Types.Mixed,
    trainer: Boolean,
    commute: Boolean,
    private: Boolean,
    average_speed: Number,
    max_speed: Number,
    average_cadence: Number,
    average_watts: Number,
    weighted_average_watts: Number,
    max_watts: Number,
    elev_high: Number,
    elev_low: Number,
    description: String,
    device_name: String,
    embed_token: String
});

export interface IActivityDocument extends IActivity, Document {

}

export const ActivityModel = model<IActivityDocument>("Activity", ActivitySchema);

