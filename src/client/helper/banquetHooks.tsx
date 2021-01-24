import { useEffect, useState } from 'react';
import { 
    getBanquetStats,
    getBanquetTeamStats, getBanquetLeaderboard, getBanquetTeams, 
    getOneBanquetTeam, getBanquetTeamStandings } from '../services/banquet';
import { IBanquetleaderboard, ILeaderboardResponse } from 'strava-service';
import { IBanquetTeamStats, IBanquetStats, IBanquetTeam, IBanquetTeamStandings } from '../../shared/interfaces/banquet.interface';

export function useBanquetTeams():IBanquetTeam[] {
    const [stats, setStats] = useState<IBanquetTeam[]>();

    useEffect(() => {
        async function getStats() {
            try {
                const res = await getBanquetTeams();
                setStats(res);
            } catch(e) {
                console.error('Invalid Stats');
            }
        }

        getStats();
    }, []);

    return stats;
}

export function useBanquetOneTeam(id:string = null):IBanquetTeam {
    const [team, setTeam] = useState<IBanquetTeam>();

    useEffect(() => {
        async function getStats() {
            try {
                const res = await getOneBanquetTeam(id);
                setTeam(res);
            } catch(e) {
                console.error('Invalid Stats');
            }
        }

        getStats();
    }, [id]);

    return team;
}


/**
 * get banquet team stats
 */
export function useBanquetTeamStats(id:string = null):IBanquetTeamStats {
    const [stats, setStats] = useState<IBanquetTeamStats>();

    useEffect(() => {
        async function getStats() {
            try {
                const res = await getBanquetTeamStats(id);
                setStats(res);
            } catch(e) {
                console.error('Invalid Stats');
            }
        }

        getStats();
    }, [id]);

    return stats;
}

export function useBanquetLeaderboard(weekCount: number):IBanquetleaderboard {
    const [stats, setStats] = useState<IBanquetleaderboard>();

    useEffect(() => {
        async function getStats() {
            try {
                const res = await getBanquetLeaderboard(weekCount);
                setStats(res);
            } catch(e) {
                console.error('Invalid Stats');
            }
        }

        getStats();
    }, []);

    return stats;
}

interface IStandings {
    leaderboard: ILeaderboardResponse[] | null
    teamsLeaderboard: IBanquetTeamStandings[] | null
}

export function useBanquetTeamStandings(weekCount: number): IStandings {
    const [stats, setStats] = useState<IStandings>({ leaderboard: null, teamsLeaderboard: null });

    useEffect(() => {
        async function getStats() {
            try {
                const res = await getBanquetTeamStandings(weekCount);
                setStats(res);
            } catch(e) {
                console.error('Invalid team standings');
            }
        }

        getStats();
    }, []);

    return stats;
}

export function useBanquetClubStats(): IBanquetStats {
    const [stats, setStats] = useState<IBanquetStats>();

    useEffect(() => {
        async function getStats() {
            try {
                const res = await getBanquetStats();
                setStats(res);
            } catch(e) {
                console.error('Invalid team standings');
            }
        }

        getStats();
    }, []);

    return stats;
}