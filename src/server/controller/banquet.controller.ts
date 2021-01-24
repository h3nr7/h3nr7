import * as express from 'express';
import * as mongodb from 'mongodb';
import { Types } from 'mongoose';
import { ActivityModel } from '../model/activity.model';
import { BanquetteamModel, BanquetteamSchema, IBanquetteamDocument, IBanquetteamWithAthlete } from '../model/banquetteam.model';
import * as Moment from 'moment';
import { authApiRequired, authApiIsClubAdmin } from '../auth/strava.strategy';
import { stravaService } from '../service/strava.service';
import { injectBanquetClubIdMiddleware } from './helper/banquet.controller.helper';
import { transStravaActivityListRes, getByPage } from './helper/strava.controller.helper';
import { 
    IBaseBanquetleaderboardData, ILeaderboardResponse 
} from 'strava-service';
import { BanquetactivityModel, IBanquetactivityDocument } from '../model/banquetactivity.model';
import { BanquetleaderboardModel } from '../model/banquetleaderboard.model';
import { AthleteModel, IAthleteDocument } from '../model/athlete.model';
import { AnyCnameRecord } from 'dns';
export const banquetController = express.Router();


/**
 * POST create a leaderboard in Mongo
 */
banquetController.post(
    "/leaderboards",
    async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            const { published, weekCount, data } = req.body;
            const { totTime, totDistance } = data.reduce((prev: any, next: any) => {
                let { totTime, totDistance } = prev;
                totTime = totTime + next.moving_time;
                totDistance = totDistance + next.distance;
                return { totTime, totDistance };
            }, { totTime: 0, totDistance: 0 })
            const doc = await BanquetleaderboardModel.create({
                totTime, totDistance,
                published, weekCount, data
            })
            res.status(200).json(doc);
        } catch(e) {
            res.status(400).send(e.message); 
        }
    }
);

/**
 * GET club leaderboard
 */
banquetController.get(
    "/leaderboards",
    async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            const { weekCount, published } = req.query;
            const doc = await BanquetleaderboardModel.findOne({
                weekCount: weekCount && Number(weekCount),
                published: published === 'true'
            }, {}, { sort: { createdAt: -1 } })
            res.status(200).json(doc);
        } catch(e) {
            res.status(400).send(e.message); 
        }
    }
)

/**
 * POST sync members from leaderboard to athletes
 */
banquetController.post(
    "/leaderboards/sync_members",
    async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            const { weekCount } = req.query;

            const doc = await BanquetleaderboardModel.findOne({
                weekCount: weekCount && Number(weekCount)
            }, {}, { sort: { createdAt: -1 } });
            const members = doc.data.map((a:IBaseBanquetleaderboardData) => ({
                firstname: a.athlete_firstname,
                lastname: a.athlete_lastname,
                stravaId: a.athlete_id
            }));
            const results = await AthleteModel.insertMany(members as IAthleteDocument[], {
                ordered: false
            });

            res.status(200).json(results);
        } catch(e) {
            res.status(400).send(e.message); 
        }
    }
)

/**
 * GET list of club activities
 */
banquetController.get(
    "/activities/sync",
    authApiRequired,
    injectBanquetClubIdMiddleware,
    authApiIsClubAdmin,
    async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const { perPage, page } = req.query;
        try {
            const stravaRes =  await stravaService.getClubActivities(
                req.params.clubId, 
                req.session.passport.user.accessToken, 
                {
                    page: Number(page) ? Number(page) : 1,
                    per_page: perPage ? Number(perPage) : 20
                });
                const activities = await BanquetactivityModel.insertMany(stravaRes.reverse() as IBanquetactivityDocument[], {
                    ordered: false
                });
                res.status(200).send(activities);
            res.status(200).send(stravaRes);
        } catch(e) {
            res.status(400).send(e.message);
        }
    }
)

/**
 * GET all club activities and sync
 */
// banquetController.get(
//     "/activities/sync",
//     authApiRequired,
//     async (req: express.Request, res: express.Response, next: express.NextFunction) => {
//         try {
//             const stravaRes =  await getByPage(BANKUET_CLUB_ID, req.session.passport.user.accessToken, 1, []);

//             const asyncFunc = async (data:ISummaryActivity) => {
//                 const { resource_state, name, distance, athlete, type, elapsed_time, moving_time, total_elevation_gain } = data;
//                 const outData = await BanquetactivityModel.findOneAndUpdate({ 
//                     resource_state, name, distance, 
//                     athlete, type, elapsed_time, 
//                     moving_time, total_elevation_gain }, {
//                     ...data
//                 }, { upsert: true, new: true });

//                 return outData;
//             };

//             const mongoData = await Promise.all(stravaRes.map(item => asyncFunc(item)));
//             res.status(200).send(mongoData);

//         } catch(e) {
//             res.status(400).send(e.message);
//         }
//     }
// );

/**
 * GET list of club activity from Mongo
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
            res.status(400).send(e.message);
        }

    });

/**
 * GET club summary aggregation of activities from Mongo
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
                    $sort: { createdAt: -1 }
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
            res.status(400).send(e.message);
        }

    }
);


/**
 * POST to create or update a team in Mongo
 */
banquetController.post(
    "/teams",
    async (req: express.Request, res: express.Response) => {
        const { 
            name,
            contact
        } = req.body
        console.log('mama', name, contact);
        try {
            const team = await BanquetteamModel.findOneAndUpdate({ name }, {
                name,
                contact
            }, { upsert: true, new: true });
            console.log('nana', name, contact);
            res.status(200).send(team);
        } catch(e) {
            res.status(400).send(e.message);
        }
    }
)

/**
 * GET list of teams from Mongo
 */
banquetController.get(
    "/teams",
    async (req: express.Request, res: express.Response) => {
        try {
            const team = await BanquetteamModel.aggregate([
                { $match: {} },
                {   
                    $lookup: {
                        from: "athletes",
                        localField: "members",
                        foreignField: "_id",
                        as: "members"
                    }
                }
            ]);
            res.status(200).send(team);
        } catch(e) {
            res.status(400).send(e.message);
        }
    }
);

/**
 * GET teams weekly standings
 */
banquetController.get(
    "/teams/standings",
    async (req: express.Request, res: express.Response) => {
        try {
            const { weekCount } = req.query;

            const teams = await BanquetteamModel.aggregate<IBanquetteamWithAthlete>([
                { $match: {} },
                {   
                    $lookup: {
                        from: "athletes",
                        localField: "members",
                        foreignField: "_id",
                        as: "members"
                    }
                }
            ]);

            const leaderboard = await BanquetleaderboardModel.aggregate<ILeaderboardResponse>([
                { $match: { weekCount: Number(weekCount) } },
                { $sort: { createdAt: -1 } },
                { $limit: 1 },
                { $project: {
                    weekCount: 1,
                    data: 1
                }},
                { $unwind: "$data" },
                { $project: {
                    stravaId: "$data.athlete_id",
                    firstname: "$data.athlete_firstname",
                    lastname: "$data.athlete_lastname",
                    profile: "$data.athlete_picture_url",
                    rank: "$data.rank",
                    avgVelocity: "$data.velocity",
                    weekTotDistance: "$data.distance",
                    weekTotElapsedTime: "$data.elapsed_time",
                    weekTotMovingTime: "$data.moving_time",
                    weekTotElevation: "$data.elev_gain",
                    weekTotActivityCount: "$data.num_activities",
                    weekBestActivityDistance: "$data.best_activities_distance",
                    weekBestActivityDistanceId: "$data.best_activities_distance_activity_id",
                    weekBestAvtivityElevation: "$data.best_activities_elev_gain",
                    weekBestActivityElevationId: "$data.best_activities_elev_gain_activity_id",
                    weekBestActivityMovingTime: "$data.best_activities_moving_time",
                    weekBestActivityMovingTimeId: "$data.best_activities_moving_time_activity_id",
                }}
            ]);

            // convert array to object
            type ILeaderboardResponseObj = Record<string, ILeaderboardResponse>;
            const leaderboardObj = leaderboard.reduce<ILeaderboardResponseObj>((
                prev: any, 
                next: ILeaderboardResponse
            ) => ({...prev, [next.stravaId]: {...next}}), {})
            
            // build teams leaderboard
            const teamsLeaderboard = teams.map((t:IBanquetteamWithAthlete) => {
                const members = t.members.map(m => {
                    const leaderboardMember = leaderboardObj[m.stravaId];
                    return {
                        ...m,
                        rank: leaderboardMember? leaderboardMember.rank:Number.MAX_SAFE_INTEGER,
                        weekTotDistance: leaderboardMember? leaderboardMember.weekTotDistance:0,
                        rankData: leaderboardMember
                    };

                });

                const teamTotDistance = members.reduce((a, b) => a + b.weekTotDistance, 0);

                 return { 
                     ...t,
                     teamTotDistance,
                     members };
            }).sort((a:any, b:any) => {
                return b.teamTotDistance - a.teamTotDistance
            });
            
            // return individual leaderboard and team leaderboard
            res.status(200).send({leaderboard, teamsLeaderboard});
        } catch(e) {
            res.status(400).send(e.message);
        }
    }
);


/**
 * Get a team member from Mongo
 */
banquetController.put(
    "/teams/:id/members",
    async (req: express.Request, res: express.Response) => {
        try {
            const members = req.body.members as [];
            // const memObj = members.map(m => Types.ObjectId(m));
            const team = await BanquetteamModel.findByIdAndUpdate(req.params.id, {
                $addToSet: { members: { $each: members } }
            }, { new: true });
            res.status(200).send(team);
        } catch(e) {
            res.status(400).send(e.message);
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
            res.status(400).send(e.message);
        }
    }
)

/**
 * GET a team from Mongo
 */
banquetController.get(
    "/teams/:id",
    async (req: express.Request, res: express.Response) => {
        try {
            const team = await BanquetteamModel.aggregate([
                { $match: { _id: Types.ObjectId(req.params.id)} },
                {   
                    $lookup: {
                        from: "athletes",
                        localField: "members",
                        foreignField: "_id",
                        as: "members"
                    }
                }
            ]);
            if(!team || team.length <=0) {
                return res.status(400).send('No team found');
            }
            res.status(200).send(team[0]);
        } catch(e) {
            res.status(400).send(e.message);
        }
    }
);

/**
 * GET team stats from Mongo
 */
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
            res.status(400).send(e.message);
        }
    }
)

/**
 * GET Athlete from Strava
 */
// banquetController.get(
//     "/athletes/:id",
//     async (req: express.Request, res: express.Response) => {
//         try {
//             const agg = await ActivityModel.aggregate([
//                 {
//                     $group: {
//                         _id: '$athlete.id',
//                         totDistance: { $sum: "$distance" }
//                     }
//                 }
//             ]);
//             res.status(200).send(agg);
//         } catch(e) {
//             res.status(400).send(e.message);
//         }
//     }
// );

banquetController.get(
    "/members/:stravaId",
    async (req: express.Request, res: express.Response) => {
        try {
            const { stravaId } = req.params;
            if(!stravaId) return res.status(400).send('Invalid Strava id');

            const agg = await AthleteModel.aggregate([
                { $match: { stravaId: Number(stravaId) } },
                
            ]);
            res.status(200).send(agg);
        } catch(e) {
            res.status(400).send(e.message);
        }
    }
);



