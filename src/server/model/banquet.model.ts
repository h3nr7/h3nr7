import { Schema, Document, model, Model, Types } from 'mongoose';
import { IAthleteDocument } from './athlete.model';
import { IActivityDocument } from './activity.model';
import { IBanquetteamDocument } from './banquetteam.model';

export const BanquetSchema = new Schema({
    athlete: {
        type: Schema.Types.ObjectId,
        ref: "Athlete",
        required: true
    },
    activities: [{
        type: Schema.Types.ObjectId,
        ref: "Activity"
    }],
    team: {
        type: Schema.Types.ObjectId,
        ref: "Banquetteam",
        required: true
    }
});

export interface IBanquet {
    athlete: Types.ObjectId
    activities: Types.ObjectId[]
    team: Types.ObjectId
}

export interface IBanquetDocument extends IBanquet, Document {
    // athlete: IAthleteDocument["_id"]
    // activities: IActivityDocument["_id"]
    // team: IBanquetteamDocument["_id"]
}

export const BanquetModel = model<IBanquetDocument>("Banquet", BanquetSchema);
