/** Required External Modules and Interfaces */
import * as express from "express";
import { QrGenerator } from '../lib/qr';
import * as passport from 'passport';
import * as Moment from 'moment';
import { authApiRequired } from '../auth/strava.strategy';
/** Router Definition */
export const stravaController = express.Router();
import { stravaService } from '../service/strava.service';
import { AthleteModel } from '../model/athlete.model';
import { transActivityListRes, transAthleteRes, transStravaActivityListRes } from './helper/strava.controller.helper';
import { IActivity, IRawActivity } from "strava-service";
import { ActivityModel } from "../model/activity.model";
/** Controller Definitions */
// simply return the user if token is correct

/**
 * GET self
 */
stravaController.get(
    "/me", 
    authApiRequired,
    async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const athlete = await stravaService.getAthlete(req.user.accessToken);
        const { id, ...baseAthlete } = athlete;
        const updatedAthlete = await AthleteModel.findOneAndUpdate({ stravaId: id }, {
            stravaId: id,
            ...baseAthlete
        }, { upsert: true, new: true });
        res.status(200).send(updatedAthlete);
    } catch(e) {
        res.status(404).send(e.message);
    }
});

/**
 * get one activity
 */
stravaController.get(
    "/activities/:id",
    authApiRequired,
    async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            const { id } = req.params;
            console.log( id );
            const activity = await stravaService.getOneActivity(id, req.user.accessToken);
            res.status(200).send(activity);
        } catch(e) {
            res.status(404).send(e.message);
        }
    });

/**
 * get list of activities
 */
stravaController.get(
    "/me/activities",
    authApiRequired,
    async (req: express.Request, res: express.Response, next: express.NextFunction) => {

        let activities:IActivity[];
        try {
            const { startDate, endDate, perPage, page, saveData } = req.query;
            const stravaRes =  await stravaService.getActivities({
                before: endDate ? Moment(endDate as string).unix() : undefined,
                after: startDate ? Moment(startDate as string).unix() : undefined,
                page: Number(page) ? Number(page) : 1,
                per_page: perPage ? Number(perPage) : 30
            }, req.user.accessToken);
            
            if(saveData && saveData==='true') {

                const asyncFunc = async (data:IRawActivity) => {
                    const { id, ...resData } = data;
                    const outData = await ActivityModel.findOneAndUpdate({ stravaId: id }, {
                        stravaId: id,
                        ...resData
                    }, { upsert: true, new: true });

                    return outData;
                };

                const mongoData = await Promise.all(stravaRes.map(item => asyncFunc(item)));
                activities = transActivityListRes(mongoData);

            } else {
                activities = transStravaActivityListRes(stravaRes);
            }

            res.status(200).send(activities);
        } catch(e) {
            res.status(404).send(e.message);
        }
    });