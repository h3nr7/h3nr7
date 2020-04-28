import * as mongoose from 'mongoose';
import { IUser } from '../../shared/interfaces/user.interface';

export type UserDocument = mongoose.Document & IUser;

export const userSchema = new mongoose.Schema({
    uid: { 
        type: mongoose.Types.ObjectId,
        index: true,
        required: true,
        auto: true
    },
    firstName: String,
    lastName: String,
    email: String
});

export const User = mongoose.model<UserDocument>('User', userSchema);