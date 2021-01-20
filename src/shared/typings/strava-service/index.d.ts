
declare module "strava-service" {

    interface IBaseClub {
        resource_state: number
        name: string
        profile_medium: string
        profile: string
        cover_photo: string
        cover_photo_small: string
        sport_type: string
        city: string
        state: string
        country: string
        private: boolean
        member_count: number
        featured: boolean
        verified: boolean
        url: string
        membership: string
        admin: boolean
        owner: boolean
        description: string
        club_type: string
        post_count: number
        owner_id: number
        following_count: number
    }

    interface IRawClub extends IBaseClub {
        id: number
    }

    interface IClub extends IBaseClub {
        stravaId: number
    }

    interface IBaseAthlete {
        username: string
        firstname: string
        lastname: string
        city: string
        country: string
        sex: 'M' | 'F'
        profile: string
        clubs: string[]
        ftp?: string
    }

    export interface IRawAthlete extends IBaseAthlete {
        id: number
    }

    export interface IAthlete extends IBaseAthlete {
        stravaId: number
    }

    export type LatLng = [number, number]

    export interface IMap {
        id: string
        polyline: string
        resource_state: number
        summary_polyline: string
    }

    export interface IBaseActivity {
        resource_state: number
        external_id: string
        upload_id: number
        athlete: {
            id: number
            resource_state: number
        }
        name: string
        distance: number
        moving_time: number
        elapsed_time: number
        total_elevation_gain: number
        type: string
        start_date: string
        start_date_local: string
        timezone: string
        start_latlng: LatLng
        end_latlng: LatLng
        kudos_count: number
        photo_count: number
        map: IMap
        trainer: boolean
        commute: boolean
        private: boolean
        average_speed: number
        max_speed: number
        average_cadence: number
        average_watts: number
        weighted_average_watts: number
        max_watts: number
        elev_high: number
        elev_low: number
        description: string
        device_name: string
        embed_token: string
    }

    export interface ISummaryActivity {
        resource_state: number
        athlete:{
            resource_state: number
            firstname: string
            lastname: string
        }
        name: string
        distance: number
        moving_time: number
        elapsed_time: number
        total_elevation_gain: number
        type: string
    }

    export interface IRawActivity extends IBaseActivity {
        id: number
    }

    export interface IActivity extends IBaseActivity {
        stravaId: number
    }

    export interface IBaseBanquetleaderboardData {
        athlete_id: number
        athlete_firstname: string
        athlete_lastname: string
        athlete_picture_url: string
        athlete_member_type: string
        distance: number
        num_activities: number
        best_activities_distance: number
        best_activities_distance_activity_id: number
        best_activities_elev_gain: number
        best_activities_elev_gain_activity_id: number
        best_activities_moving_time: number
        best_activities_moving_time_activity_id: number
        elapsed_time: number
        moving_time: number
        elev_gain: number
        swim_time: number
        run_time: number
        ride_time: number
        rank: number
        velocity: number
    }

    export interface IRawBanquetleaderboardData extends IBaseBanquetleaderboardData {
    }

    export interface IBaseBanquetleaderboard {
        totTime: number
        totElevation: number
        totDistance: number
        weekCount: number
        data: IBaseBanquetleaderboardData[]
    }

    export interface IRawBanquetleaderboard extends IBaseBanquetleaderboard {
    }

    export interface IBanquetleaderboard extends IBaseBanquetleaderboard{
    }

    export interface IGetActivities {
        before?: number
        after?: number
        page?: number
        per_page?: number
    }

    export interface IGetMembers {
        page?: number
        per_page?: number
    }

    export interface ILeaderboardResponse {
        _id: string
        stravaId: number
        firstname: string
        lastname: string
        profile: string
        rank: number
        avgVelocity: number
        weekTotDistance: number
        weekTotElapsedTime: number
        weekTotMovingTime: number
        weekTotElevation: number
        weekTotActivityCount: number
        weekBestActivityDistance: number
        weekBestActivityDistanceId: string
        weekBestAvtivityElevation: number
        weekBestActivityElevationId: string
        weekBestActivityMovingTime: number
        weekBestActivityMovingTimeId: string
    }
}
