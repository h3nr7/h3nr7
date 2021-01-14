
import { EventEmitter } from 'events';
import Axios from 'axios';
import { IRawAthlete, IRawActivity, IGetActivities } from 'strava-service';
interface IStravaService {
    apiUrl: string
}


class StravaService extends EventEmitter implements IStravaService {

    apiUrl = `${process.env.STRAVA_API_URL}/${process.env.STRAVA_API_VERSION}`;
    
    /**
     * get athlete
     * @param token 
     */
    async getAthlete(token: string):Promise<IRawAthlete> {
        const url =`${this.apiUrl}/athlete`;
        try {
            const res = await Axios(url, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return res.data as IRawAthlete;
        } catch(e) {
            throw new Error(`Strava service error: ${e.message}`)
        }
    }

    /**
     * get activity
     * @param id 
     * @param token 
     */
    async getOneActivity(id: string, token: string):Promise<IRawActivity> {
        const url =`${this.apiUrl}/activities/${id}`;
        try {
            const res = await Axios(url, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return res.data as IRawActivity;
        } catch(e) {
            throw new Error(`Strava service error: ${e.message}`)
        }
    }

    /**
     * get all activities
     * @param params 
     * @param token 
     */
    async getActivities(params:IGetActivities, token: string):Promise<IRawActivity[]> {
        const url =`${this.apiUrl}/athlete/activities`;
        try {
            const res = await Axios(url, {
                params,
                headers: { Authorization: `Bearer ${token}` }
            });
            return res.data as IRawActivity[];
        } catch(e) {
            throw new Error(`Strava service error: ${e.message}`)
        }
    }
}

export const stravaService = new StravaService();

