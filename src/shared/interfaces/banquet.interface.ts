import { IActivity } from "strava-service";


export interface IBanquetMember {
    _id: string
    stravaId: number
    city: string
    country: string
    firstname: string
    lastname: string
    profile: string
    username: string
}

export interface IBanquetActivity {
    _id: string
    stravaId: string
    athlete: {
        id: number
        resource_state: number
    }
    average_speed: number
    commute: boolean
    distance: number
    elapsed_time: number
    end_latlng:[number, number]
    name: string
    start_date: string
    start_latlng: [number, number]
    total_elevation_gain: number
    type: string
}

export interface IBanquetTeamStats {
    _id: string
    name: string
    totDistance: number
    totElevation: number
    createdAt: string
    updatedAt: string
    contact: string
    totTime: number
    members: IBanquetMember[]
    activities: IBanquetActivity[]
}