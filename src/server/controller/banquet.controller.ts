import * as express from 'express';
import * as mongodb from 'mongodb';
import { Types } from 'mongoose';
import { ActivityModel } from '../model/activity.model';
import { BanquetteamModel, BanquetteamSchema } from '../model/banquetteam.model';
import * as Moment from 'moment';
import { authApiRequired } from '../auth/strava.strategy';
import { stravaService } from '../service/strava.service';
import { transStravaActivityListRes, getByPage } from './helper/strava.controller.helper';
import { IActivity, ISummaryActivity } from 'strava-service';
import { BanquetactivityModel } from '../model/banquetactivity.model';
export const banquetController = express.Router();


const BANKUET_CLUB_ID = "818526";

/**
 * GET all activities and sync
 */
banquetController.get(
    "/activities/sync",
    authApiRequired,
    async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            const stravaRes =  await getByPage(BANKUET_CLUB_ID, req.session.passport.user.accessToken, 1, []);

            const asyncFunc = async (data:ISummaryActivity) => {
                const { resource_state, name, distance, athlete, type, elapsed_time, moving_time, total_elevation_gain } = data;
                const outData = await BanquetactivityModel.findOneAndUpdate({ 
                    resource_state, name, distance, 
                    athlete, type, elapsed_time, 
                    moving_time, total_elevation_gain }, {
                    ...data
                }, { upsert: true, new: true });

                return outData;
            };

            const mongoData = await Promise.all(stravaRes.map(item => asyncFunc(item)));
            res.status(200).send(mongoData);

        } catch(e) {
            res.status(404).send(e.message);
        }
    }
);

/**
 * GET list of teams
 */
banquetController.get(
    "/activities",
    async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const { perPage, page } = req.query;

        const skip = (page && Number(page)>0) ? Number(page) : 1;
        const limit = (perPage && Number(perPage)>0) ? Number(perPage) : 10;
        try {
            const activities = await BanquetactivityModel.find({}, {}, {
                skip, limit
            });
            res.status(200).send(activities);
        } catch(e) {
            res.status(404).send(e.message);
        }

    });

/**
 * GET summary aggregation of activities
 */
banquetController.get(
    "/activities/summary",
    async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            const summary = await BanquetactivityModel.aggregate([
                {
                    $unset: [
                        "__v"
                    ]
                },
                {
                    $group: {
                        _id: null,
                        totDistance: {
                            $sum: "$distance"
                        },
                        totElevation: {
                            $sum: "$total_elevation_gain"
                        },
                        totTime: {
                            $sum: "$elapsed_time"
                        },
                        activities: {
                            $push: "$$ROOT"
                        }
                    }
                },
                {
                    $project: {
                        totDistance: 1,
                        totElevation: 1,
                        totTime: 1,
                        latestActivities: {
                            $slice: [ "$activities", 0,  10]
                        }

                    }
                },
            ])
            res.status(200).send(summary[0]);
        } catch(e) {
            res.status(404).send(e.message);
        }

    }
);


/**
 * POST to create or update a team
 */
banquetController.post(
    "/teams",
    async (req: express.Request, res: express.Response) => {
        const { 
            name,
            contact
        } = req.body

        try {
            const team = await BanquetteamModel.findOneAndUpdate({ name }, {
                name,
                contact
            });
            res.status(200).send(team);
        } catch(e) {
            res.status(404).send(e.message);
        }
    }
)

/**
 * GET list of teams
 */
banquetController.get(
    "/teams",
    async (req: express.Request, res: express.Response) => {
        try {
            const team = await BanquetteamModel.find();
            res.status(200).send(team);
        } catch(e) {
            res.status(404).send(e.message);
        }
    }
);


banquetController.put(
    "/teams/:id/members",
    async (req: express.Request, res: express.Response) => {
        try {
            const members = req.body.members as [];
            const memObj = members.map(m => Types.ObjectId(m));
            console.log('mem', memObj);
            const team = await BanquetteamModel.findByIdAndUpdate(req.params.id, {
                $addToSet: { members: { $each: memObj } }
            }, { new: true });
            res.status(200).send(team);
        } catch(e) {
            res.status(404).send(e.message);
        }
    }
);

banquetController.put(
    "/teams/:id",
    async (req: express.Request, res: express.Response) => {
        try {
            const bulkOps:mongodb.BulkWriteOperation<typeof BanquetteamSchema>[] = [{
                updateOne: {
                    filter: { _id: req.params.id },
                    update: {  },
                    upsert: true
                }
            }];
            const team = await BanquetteamModel.collection.bulkWrite(bulkOps)
            res.status(200).send(team);
        } catch(e) {
            res.status(404).send(e.message);
        }
    }
)

banquetController.get(
    "/teams/:id",
    async (req: express.Request, res: express.Response) => {
        try {
            const team = await BanquetteamModel.findById(req.params.id);
            res.status(200).send(team);
        } catch(e) {
            res.status(404).send(e.message);
        }
    }
);

banquetController.get(
    "/teams/:id/stats",
    async (req: express.Request, res: express.Response) => {
        try {
            const { id } = req.params; 
            const team = await BanquetteamModel.aggregate([
                { $match: { _id: Types.ObjectId(id) } },
                {   
                    $lookup: {
                        from: "athletes",
                        localField: "members",
                        foreignField: "_id",
                        as: "members"
                    }
                },
                { $unwind: "$members" },
                {
                    $lookup: {
                        from: "activities",
                        let: { 
                            members_stravaId: "$members.stravaId"
                        },
                        pipeline: [
                            { $match: {
                                $expr: {
                                    $and: [
                                        { $gte: [
                                            { $toDate: "$start_date" },
                                            { $toDate: '2021-01-10' }
                                        ]},
                                        { $lte: [
                                            { $toDate: "$start_date" },
                                            { $toDate: '2021-02-15' }
                                        ]},
                                        { $eq: ["$$members_stravaId", "$athlete.id"] },
                                        {
                                            $or: [
                                                {$eq: ["$type", 'Ride']},
                                                {$eq: ["$type", 'VirtualRide']}
                                            ]
                                        }
                                    ]
                                }
                            }},
                            {
                                $sort: { "start_date": -1 }
                            },
                            { $project: { 
                                _id: 1, 
                                name: 1,
                                athlete: 1,
                                distance: 1, 
                                elapsed_time: 1, 
                                start_date: 1,
                                total_elevation_gain: 1,
                                stravaId: 1,
                                start_latlng: 1,
                                end_latlng: 1,
                                type: 1
                            }}
                        ],
                        as: "activities"
                    }
                },
                {
                    $group: {
                        _id: "$_id",
                        name: { $first: "$name" },
                        createdAt: { $first: "$createdAt" },
                        updatedAt:{ $first: "$updatedAt" },
                        contact: { $first: "$contact" },
                        members: { $push: "$members" },
                        activities: { $push: "$activities" }
                    }
                },
                {
                    $addFields: {
                        activities: { 
                                $reduce: {
                                input: "$activities",
                                initialValue: [],
                                in: { $concatArrays: ["$$value", "$$this"] }
                            }
                        }
                    }
                },
                { $unwind: "$activities" },
                { $sort: { "activities.start_date": -1 }}, 
                {
                    $group: {
                        _id: "$_id",
                        name: { $first: "$name" },
                        createdAt: { $first: "$createdAt" },
                        updatedAt:{ $first: "$updatedAt" },
                        contact: { $first: "$contact" },
                        members: { $first: "$members" },
                        activities: { $push: "$activities" }
                    }
                },
                {
                    $set: {
                        totDistance: {
                            $sum: "$activities.distance"
                        },
                        totElevation: {
                            $sum: "$activities.total_elevation_gain"
                        },
                        totTime: {
                            $sum: "$activities.elapsed_time"
                        }
                    }
                },
                {
                    $project: {
                        _id: 1,
                        name: 1,
                        createdAt: 1,
                        updatedAt: 1,
                        contact: 1,
                        members: 1,
                        activities: {
                            $slice: [ "$activities", 0,  8]
                        },
                        totDistance: 1,
                        totElevation: 1,
                        totTime: 1

                    }
                },
                {
                    $unset: [
                        "__v"
                    ]
                }
                
            ]);

            if(team.length <= 0) {
                res.status(204).send({});
            } else {
                res.status(200).send(team[0]);
            }
        } catch(e) {
            res.status(404).send(e.message);
        }
    }
)

banquetController.get(
    "/athletes/:id",
    async (req: express.Request, res: express.Response) => {
        try {
            const agg = await ActivityModel.aggregate([
                {
                    $group: {
                        _id: '$athlete.id',
                        totDistance: { $sum: "$distance" }
                    }
                }
            ]);
            res.status(200).send(agg);
        } catch(e) {
            res.status(404).send(e.message);
        }
    }
);



