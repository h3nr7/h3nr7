import { Model, Schema, Document, model, Types } from 'mongoose';
import { IAthleteDocument } from './athlete.model';

export const BanquetteamSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    contact: String,
    totDistance: Number,
    totElevation: Number,
    totTime: Number
}, {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
});

export interface IBanquetteam {
    name: string
    contacat: string
    totDistance: number
    totElevation: number
    totTime: number
    createdAt: string
    updatedAt: string
    members: Types.ObjectId[]
}

export interface IBanquetteamDocument extends IBanquetteam, Document {
    members: IAthleteDocument["_id"]
}

export const BanquetteamModel = model<IBanquetteamDocument>("Banquetteam", BanquetteamSchema);
