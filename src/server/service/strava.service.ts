
import { EventEmitter } from 'events';
import Axios from 'axios';
import { IRawAthlete, IRawActivity, IGetActivities, IGetMembers, ISummaryActivity } from 'strava-service';
interface IStravaService {
    apiUrl: string
}


class StravaService extends EventEmitter implements IStravaService {

    apiUrl = `${process.env.STRAVA_API_URL}/${process.env.STRAVA_API_VERSION}`;
    

    getClubMembers(id:string, token: string, params:IGetMembers):Promise<IRawActivity[]> {
        const url =`${this.apiUrl}/clubs/${id}/members`;
        return Axios(url, {
                params,
                headers: { Authorization: `Bearer ${token}` }
            })
            .then(res => res.data as IRawActivity[])
            .catch(e => { throw e });
    }

    getClubActivities(id:string, token: string, params:IGetActivities):Promise<ISummaryActivity[]> {
        const url =`${this.apiUrl}/clubs/${id}/activities`;
        return Axios(url, {
                params,
                headers: { Authorization: `Bearer ${token}` }
            })
            .then(res => res.data as ISummaryActivity[])
            .catch(e => { throw e });
    }

    /**
     * get athlete
     * @param token 
     */
    getAthlete(token: string):Promise<IRawAthlete> {
        const url =`${this.apiUrl}/athlete`;
        return Axios(url, {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then(res => res.data as IRawAthlete)
            .catch(e => { throw e });
    }

    /**
     * get activity
     * @param id 
     * @param token 
     */
    getOneActivity(id: string, token: string):Promise<IRawActivity> {
        const url =`${this.apiUrl}/activities/${id}`;
        return Axios(url, {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then(res => res.data as IRawActivity)
            .catch(e => { throw e });
    }

    /**
     * get all activities
     * @param params 
     * @param token 
     */
    getActivities(params:IGetActivities, token: string):Promise<IRawActivity[]> {
        const url =`${this.apiUrl}/athlete/activities`;
        return Axios(url, {
            params,
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => res.data as IRawActivity[])
        .catch(e => { throw e });
    }
}

export const stravaService = new StravaService();

