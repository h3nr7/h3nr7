import { ISkills } from './skills';

export interface IProfiles {
    data: [IProfile]
}

export interface IProfile {
    displayName: string
    firstName: string
    lastName: string
    title: string
    email: string
    contact: string
    address1: string
    address2: string
    city: string
    postcode: string
    skills: ISkills
    references?: any
}