import * as express from 'express';

export const BANKUET_CLUB_ID = "818526";

/**
 * inject Banquet strava club id
 * @param req 
 * @param res 
 * @param next 
 */
export const injectBanquetClubIdMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    req.params.clubId = BANKUET_CLUB_ID
    next();
}