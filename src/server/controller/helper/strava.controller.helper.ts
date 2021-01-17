import { IActivity, IAthlete, IRawActivity, ISummaryActivity } from 'strava-service';
import { IActivityDocument } from '../../model/activity.model';
import { IAthleteDocument } from '../../model/athlete.model';
import { stravaService } from '../../service/strava.service';


export function transAthleteRes(res: IAthleteDocument): IAthlete {
    if(!res) throw new Error('No athlete data to transform');
    return res as IAthlete;
}

export function transAthleteListRes(res: IAthleteDocument[]): IAthlete[] {
    if(!res) throw new Error('No athlete data to transform');
    return res as IAthlete[];
}


export function transActivityRes(res: IActivityDocument): IActivity {
    if(!res) throw new Error('No activity data to transform');
    return res as IActivity;
}


export function transActivityListRes(res: IActivityDocument[]): IActivity[] {
    if(!res) throw new Error('No activity data to transform');
    return res.map(data => transActivityRes(data));
}


/**
 * transform strava activity from response
 * @param res 
 */
export function transStravaActivityRes(res: IRawActivity): IActivity {
    if(!res) throw new Error('No activity data to transform');
    const { id, ...filteredRes } = res;
    return {
        stravaId: id,
        ...filteredRes
    };
}

/**
 * Transform strava activity list from response
 * @param res 
 */
export function transStravaActivityListRes(res: IRawActivity[]): IActivity[] {
    if(!res) throw new Error('No activity data to transform');
    return res.map(data => transStravaActivityRes(data));
}

/**
 * recursive function the scrape all club activities data
 * @param id
 * @param token 
 * @param page 
 * @param aggRes 
 */
export async function getByPage(id:string, token: string, page:number, aggRes:ISummaryActivity[]):Promise<ISummaryActivity[]>  {
    return stravaService.getClubActivities(
        id, 
        token, 
        {
            page,
            per_page: 100
        }
    ).then((res:ISummaryActivity[]) => {
        if(res.length > 0) {
            return getByPage(id, token, page+1, [...aggRes, ...res]);
        }

        return Promise.resolve(aggRes);
    });
}