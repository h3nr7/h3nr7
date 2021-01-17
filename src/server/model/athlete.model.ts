import { Schema, Document, model } from 'mongoose';
import { IAthlete } from 'strava-service';

const AthleteSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    stravaId: {
        type: Number,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true
    },
    createdAt: String,
    updatedAt: String,
    profile: String,
    city: String,
    country: String
});

AthleteSchema.index({'$**': 'text'});

// export interface IMongoAthlete {
//     firstName: string
//     lastname: string
//     stravaId: number
//     username: string
//     createdAt: string
//     updatedAt: string
//     profile: string
//     city: string
//     country: string
// }

export interface IAthleteDocument extends IAthlete, Document {

}

export const AthleteModel = model<IAthleteDocument>("Athlete", AthleteSchema);


