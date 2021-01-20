import { Schema, Document, model } from 'mongoose';
import { IBanquetleaderboard } from 'strava-service';

export const BanquetleaderboardSchema = new Schema({
    totTime: Number,
    totElevation: Number,
    totDistance: Number,
    published: {
        type: Boolean,
        required: true
    },
    weekCount: {
        type: Number,
        required: true
    },
    data: [{
        athlete_id: Number,
        athlete_firstname: String,
        athlete_lastname: String,
        athlete_picture_url: String,
        athlete_member_type: String,
        distance: Number,
        num_activities: Number,
        best_activities_distance: Number,
        best_activities_distance_activity_id: Number,
        best_activities_elev_gain: Number,
        best_activities_elev_gain_activity_id: Number,
        best_activities_moving_time: Number,
        best_activities_moving_time_activity_id: Number,
        elapsed_time: Number,
        moving_time: Number,
        elev_gain: Number,
        swim_time: Number,
        run_time: Number,
        ride_time: Number,
        rank: Number,
        velocity: Number
    }]
}, {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
});

export interface IBanquetleaderboardDocument extends IBanquetleaderboard, Document {

}

export const BanquetleaderboardModel = model<IBanquetleaderboardDocument>("Banquetleaderboard", BanquetleaderboardSchema);

