import { IAthlete } from 'strava-service';

declare module "express-session" {

	interface User {
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

	interface Session {
		type: string
		passport: {
			user: User
		}
		accessToken: string
		requestToken: string
	}
}
