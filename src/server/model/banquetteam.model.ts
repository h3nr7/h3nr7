import { Model, Schema, Document, model, Types } from 'mongoose';
import { IAthlete } from 'strava-service';
import { IAthleteDocument } from './athlete.model';

export const BanquetteamSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    contact: String,
    totDistance: Number,
    totElevation: Number,
    totTime: Number,
    members: [{
        type: Schema.Types.ObjectId,
        ref: "Athlete"
    }]
}, {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
});

export interface IBaseBanquetteam {
    name: string
    contacat: string
    totDistance: number
    totElevation: number
    totTime: number
    createdAt: string
    updatedAt: string
}

export interface IBanquetteam extends IBaseBanquetteam {
    members: string[]
}

export interface IBanquetteamWithAthlete extends IBaseBanquetteam {
    members: IAthleteDocument[]
}

export interface IBanquetteamDocument extends IBanquetteam, Document {
    // members: IAthleteDocument["_id"]
}

export const BanquetteamModel = model<IBanquetteamDocument>("Banquetteam", BanquetteamSchema);
