import { Request, Response, NextFunction } from "express";
import * as jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET;


export const checkToken = async (req:Request, res:Response, next: NextFunction) => {
    try {   
        const { token } = req.params;
        const verified = await new Promise<any>((resolve,reject) => {
            jwt.verify(token, JWT_SECRET, (err, decoded) => {
                if(err || !decoded) reject(err);
                else resolve({...decoded});
            });
        });
        const { firstName, lastName, email, date, exp } = verified;
        req.user = {
            firstName, 
            lastName, 
            email,
            date,
            exp
        };
        next();
    } catch(e) {
        next(e.message);
    }
}