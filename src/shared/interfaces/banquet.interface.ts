import { IActivity } from "strava-service";
import { ILeaderboardResponse } from "strava-service";


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

export interface IBanquetSummaryActivity {
    _id: string
    athlete: {
        firstname: string
        lastname: string
        resource_state: number
    }
    distance: number
    elapsed_time: number
    moving_time: number
    name: string
    resource_state: 2
    total_elevation_gain: number
    type: string
    createdAt: string
    updatedAt: string
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

export interface IBanquetTeam {
    _id: string
    name: string
    createdAt: string
    updatedAt: string
    contact: string
    totElevation: number
    totDistance: number
    totTime: number
    members: IBanquetMember[]

}

export interface IBanquetStats {
    totDistance: number
    totElevation: number
    totTime: number
    latestActivities: IBanquetSummaryActivity[]
}

export interface IBanquetTeamStandings extends IBanquetTeam {
    members: IBanquetMember[] & {
        rank: number
        weekTotDistance: number
        rankData: ILeaderboardResponse
    }[]
    teamTotDistance: number
}