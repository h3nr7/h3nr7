import { Request, Response, NextFunction } from "express";
import * as jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET;

/**
 * Check the token that was passed in params or header
 */
export const checkToken = (ignoreExpiration=false) => async (req:Request, res:Response, next: NextFunction) => {
    try {   
        const { token } = req.params;
        const bearerToken = req.get('authorization') && req.get('authorization').split(' ')[1];

        const verified = await new Promise<any>((resolve,reject) => {
            jwt.verify(token || bearerToken, JWT_SECRET, { ignoreExpiration }, (err, decoded) => {
                if(err || !decoded) reject(err);
                else resolve({...decoded});
            });
        });
        const { firstName, lastName, email, date, cvId, exp } = verified;
        req.user = {
            firstName, lastName, email,
            cvId, date, exp
        };
        req.token = token || bearerToken;
        next();
    } catch(e) {
        next(e.message);
    }
}