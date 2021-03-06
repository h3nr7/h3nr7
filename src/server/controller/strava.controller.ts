/** Required External Modules and Interfaces */
import * as express from "express";
import { QrGenerator } from '../lib/qr';
import * as passport from 'passport';
import * as Moment from 'moment';
import { authApiRequired } from '../auth/strava.strategy';
/** Router Definition */
export const stravaController = express.Router();
import { stravaService } from '../service/strava.service';
import { AthleteModel, IAthleteDocument } from '../model/athlete.model';
import { 
    transActivityListRes, transAthleteRes, 
    transStravaActivityListRes, getByPage,
    transAthleteListRes
} from './helper/strava.controller.helper';
import { IActivity, IAthlete, IRawActivity, ISummaryActivity } from "strava-service";
import { ActivityModel } from "../model/activity.model";
/** Controller Definitions */
// simply return the user if token is correct


stravaController.post(
    "/athletes",
    async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            const { stravaId, firstname, lastname, username } = req.body;
            const newAthlete = await AthleteModel.create({ 
                firstname,
                lastname,
                username,
                stravaId: Number(stravaId)
            });
            res.status(200).send(newAthlete);
        } catch(e) {
            res.status(400).send(e.message);
        }
});

stravaController.post(
    "/athletes/bulk",
    async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            const { athletes } = req.body;
            const insertAthletes = athletes as IAthleteDocument[];
            const newAthlete = await AthleteModel.insertMany(
                insertAthletes, {
                    ordered: false
                }
            );
            res.status(200).send(newAthlete);
        } catch(e) {
            res.status(400).send(e.message);
        }
});

/**
 * GET self
 */
stravaController.get(
    "/me", 
    authApiRequired,
    async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            const athlete = await stravaService.getAthlete(req.session.passport.user.accessToken);
            const { id, ...baseAthlete } = athlete;
            const updatedAthlete = await AthleteModel.findOneAndUpdate({ stravaId: id }, {
                stravaId: id,
                ...baseAthlete
            }, { upsert: true, new: true });
            res.status(200).send(updatedAthlete);
        } catch(e) {
            res.status(400).send(e.message);
        }
});

stravaController.get(
    "/athletes/search",
    async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const { stravaId, text } = req.query;

        let inQuery = {};
        if(stravaId) inQuery = { stravaId: Number(stravaId) };
        else if(text) inQuery = { $text: { $search: text} };
        else return res.status(204).send([]);

        try {
            const athleteRes = await AthleteModel.find(inQuery);
            const athlete = transAthleteListRes(athleteRes);
            res.status(200).send(athlete);
        } catch(e) {
            res.status(400).send(e.message);
        }
    }
);

stravaController.get(
    "/athletes",
    async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const { id } = req.params;
        try {
            const athleteRes = await AthleteModel.find();
            const athleteList = athleteRes
                                    .map(res => transAthleteRes(res))
                                    .sort((a:IAthlete, b:IAthlete) => (
                                       a.firstname.localeCompare(b.firstname)
                                    ));
            
            res.status(200).send({
                count: athleteList.length,
                data: athleteList
            });
        } catch(e) {
            res.status(400).send(e.message);
        }
    }
)

stravaController.get(
    "/athletes/:id",
    async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const { id } = req.params;
        try {
            const athleteRes = await AthleteModel.findById(id);
            const athlete = transAthleteRes(athleteRes);
            res.status(200).send(athlete);
        } catch(e) {
            res.status(400).send(e.message);
        }
    }
)

/**
 * get one activity
 */
stravaController.get(
    "/activities/:id",
    authApiRequired,
    async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            const { id } = req.params;
            const activity = await stravaService.getOneActivity(id, req.session.passport.user.accessToken);
            res.status(200).send(activity);
        } catch(e) {
            res.status(400).send(e.message);
        }
    });

/**
 * get list of club activities
 */
stravaController.get(
    "/clubs/:id/activities",
    authApiRequired,
    async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const { id } = req.params;
        const { perPage, page } = req.query;

        try {
            const stravaRes =  await stravaService.getClubActivities(
                id, 
                req.session.passport.user.accessToken, 
                {
                    page: Number(page) ? Number(page) : 1,
                    per_page: perPage ? Number(perPage) : 30
                });
            res.status(200).send(stravaRes);
        } catch(e) {
            res.status(400).send(e.message);
        }
    }
)


/**
 * get all activities of club
 */
stravaController.get(
    "/clubs/:id/activities/all",
    authApiRequired,
    async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const { id } = req.params;
        try {
            const stravaRes =  await getByPage(id, req.session.passport.user.accessToken, 1, []);
            res.status(200).send(stravaRes);
        } catch(e) {
            res.status(400).send(e.message);
        }
    }
)

stravaController.get(
    "/clubs/:id/members",
    authApiRequired,
    async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        let activities:IActivity[];
        const { id } = req.params;
        const { perPage, page } = req.query;

        try {
            const stravaRes =  await stravaService.getClubMembers(
                id, 
                req.session.passport.user.accessToken, 
                {
                    page: Number(page) ? Number(page) : 1,
                    per_page: perPage ? Number(perPage) : 50
                });

            activities = transStravaActivityListRes(stravaRes);
            res.status(200).send(activities);
        } catch(e) {
            res.status(400).send(e.message);
        }

    }
)      

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
                per_page: perPage ? Number(perPage) : 100
            }, req.session.passport.user.accessToken);
            
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