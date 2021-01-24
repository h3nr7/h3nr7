import * as axios from 'axios';
import { IBanquetleaderboard, ILeaderboardResponse } from 'strava-service'; 
import { IBanquetStats, IBanquetTeam, IBanquetTeamStandings, IBanquetTeamStats } from '../../shared/interfaces/banquet.interface';

/**
 * get banquet leaderboard by week
 * @param weekCount 
 */
export const getBanquetLeaderboard = (weekCount:number) => {
    return axios.default.get(`/api/banquet/leaderboards`, {
        params: { weekCount, published: true }
    }).then(res => res.data as IBanquetleaderboard);
}

/**
 * get all bankuet teams
 */
export const getBanquetTeams = () => {
    return axios.default.get(`/api/banquet/teams`).then(res => res.data as IBanquetTeamStats[]);
}

/**
 * get one banquet team
 * @param id 
 */
export const getOneBanquetTeam = (id:string) => {
    return axios.default.get(`/api/banquet/teams/${id}`).then(res => res.data as IBanquetTeam);
}

/**
 * get bankuet team stats
 * @param id 
 */
export const getBanquetTeamStats = (id:string) => {
    return axios.default.get(`/api/banquet/teams/${id}/stats`).then(res => res.data as IBanquetTeamStats);
}

/**
 * get bankuet team standings
 * @param weekCount
 */
export const getBanquetTeamStandings = (weekCount:number) => {
    return axios.default.get(`/api/banquet/teams/standings`, {
        params: { weekCount, published: true }
    }).then(res => res.data as { 
        leaderboard: ILeaderboardResponse[]
        teamsLeaderboard: IBanquetTeamStandings[]
    });
}

/**
 * get bankuet stats summary
 */
export const getBanquetStats = () => {
    return axios.default.get(`/api/banquet/activities/summary`).then(res => res.data as IBanquetStats);
}

/**
 * sync bankuet activities from strava
 */
export const syncBanquetActivities = () => {
    return axios.default.get(`/api/banquet/activities/sync`, {
        params: { page: 1 }
    }).then(res => res.data);
}