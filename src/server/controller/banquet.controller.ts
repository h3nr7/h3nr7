import * as express from 'express';
import * as mongodb from 'mongodb';
import { Types } from 'mongoose';
import { ActivityModel } from '../model/activity.model';
import { BanquetteamModel, BanquetteamSchema } from '../model/banquetteam.model';
import * as Moment from 'moment';
export const banquetController = express.Router();

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
                        let: {
                            athlete_id: "$athletes._id"
                        },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $eq: ["$members", "$$athlete_id"]
                                    }
                                }
                            },
                            { $sort: { "firstname": 1 } }
                        ],
                        as: "members"
                    }
                },
                {
                    $lookup: {
                        from: "activities",
                        let: { 
                            activities_AthleteId: "$activities.athlete.id"
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
                                        { $eq: ["$members.stravaId", "$$activities_AthleteId"] },
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



