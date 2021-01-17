
declare module "strava-service" {

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
}
