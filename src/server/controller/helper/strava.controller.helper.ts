import { IActivity, IAthlete, IRawActivity } from 'strava-service';
import { IActivityDocument } from '../../model/activity.model';
import { IAthleteDocument } from '../../model/athlete.model';

export function transAthleteRes(res: IAthleteDocument): IAthlete {
    if(!res) throw new Error('No athlete data to transform');
    return res as IAthlete;
}

export function transActivityRes(res: IActivityDocument): IActivity {
    if(!res) throw new Error('No activity data to transform');
    return res as IActivity;
}

export function transActivityListRes(res: IActivityDocument[]): IActivity[] {
    if(!res) throw new Error('No activity data to transform');
    return res.map(data => transActivityRes(data));
}


export function transStravaActivityRes(res: IRawActivity): IActivity {
    if(!res) throw new Error('No activity data to transform');
    const { id, ...filteredRes } = res;
    return {
        stravaId: id,
        ...filteredRes
    };
}

export function transStravaActivityListRes(res: IRawActivity[]): IActivity[] {
    if(!res) throw new Error('No activity data to transform');
    return res.map(data => transStravaActivityRes(data));
}