// import * as jsonwebtoken from 'jsonwebtoken';

// declare for all image extension
declare module '*.svg' {
	const content: string;
  	export default content;
}
declare module '*.png';
declare module '*.jpg';
declare module '*.gif';
declare module '*.less';

// express request add on 
declare namespace Express {
	export interface Request {
		user?: {
			firstName: string,
			lastName: string,
			email: string,
			date?:string,
			exp:string
		}
	}
}