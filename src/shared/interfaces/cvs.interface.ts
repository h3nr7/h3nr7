import { IProfile } from "./profiles.interface";

export interface ICV<T=any, S=any> {
    id: string;
    createdAt?: string;
    updatedAt?: string;
    name?: string
    summary?: string
    profile?: IProfile
    sortExperienceByDate?: boolean
    experiences?: T[]
    educations?: S[]
}

export interface ICVs {
    total: number;
    skip: number;
    limit: number;
    items: Array<ICV>;
}