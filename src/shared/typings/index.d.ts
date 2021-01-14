// import * as jsonwebtoken from 'jsonwebtoken';
import { IAthlete } from 'strava-service';
// express request add on 
declare global {
	namespace Express {

		export interface User {
			firstName?: string
			lastName?: string
			email?: string
			cvId?:string
			date?:string
			exp?:string
			accessToken?:string
			refreshToken?:string
			profile?: IAthlete
		}
		
		export interface Request {
			user?: User
			token?: string
		}
	}
}
