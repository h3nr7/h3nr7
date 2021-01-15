import * as config from 'config';
import * as fs from 'fs';
import * as path from 'path';
import * as express from 'express';
import * as compression from 'compression';
import * as helmet from 'helmet';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import * as handlebars from 'express-handlebars';
import * as session from 'express-session';
import * as redis from 'redis';
import * as connect from 'connect-redis';

import * as webpack from 'webpack';
import * as webpackDevMiddleware from 'webpack-dev-middleware';
import * as webpackHotMiddleware from 'webpack-hot-middleware';
import * as webpackConfig from '../webpack/webpack.config.dev';
import { registerRoutes } from './controller/index';
import { initAuth } from './auth/passport';  


const isDevMode: boolean = process.env.NODE_ENV === "development" || false;
const isProdMode: boolean = process.env.NODE_ENV === "production" || false;

export function createApp(logfilePath: string):express.Application {

    // init app
	const app:express.Application = express();
	// logger streams
	const accessLogFilename: string = config.get("Logfiles.AccessFilename");
	const accessLogStream: fs.WriteStream = fs.createWriteStream(path.join(logfilePath, accessLogFilename), { flags: "a" });

	// dev mode webpack compiler
	if(isDevMode) {
		const compiler: webpack.ICompiler = webpack(webpackConfig as webpack.Configuration);
		app.use(webpackDevMiddleware(compiler, { publicPath: webpackConfig.output.publicPath }));
		app.use(webpackHotMiddleware(compiler));
	}
    
    // prod mode built static resources
	app.use("/public", express.static(path.join(__dirname, "..", "..", "public")));
	if(isProdMode) {
		app.use("/dist", express.static(path.join(__dirname, "..", "dist")));
    }
    
	// app use
	// sessions
	let sessParams: session.SessionOptions = {
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
		// had to set cookie secure to false for passport to work with redis
		// need to find a way to keep it secure.
		cookie: {
			secure: false
		}
	}
	
	// if(isProdMode) {
		let RedisStore = connect(session);
		let redisClient = redis.createClient({
			url: process.env.REDIS_URL
		});
		app.use(session({
			...sessParams,
			store: new RedisStore({ client: redisClient })
		}));
	// } else {
	// 	app.use(session({
	// 		...sessParams
	// 	}))
	// }
	app.use(compression());
	app.use(helmet());
	app.use(cors());
	app.use(bodyParser.json());
	app.use(compression());
	app.use(bodyParser.urlencoded({ extended: true }));
	// set up handlebars
	app.engine('.hbs', handlebars({
		layoutsDir: path.join(__dirname, '..', '..', 'views', 'layouts'),
		partialsDir: path.join(__dirname, '..', '..', 'views', 'partials'),
		defaultLayout: 'default',
		extname: '.hbs'
	}));
	app.set('view engine', '.hbs');

	// init auth for app
	initAuth(app);
    // use controller routes
    registerRoutes(app);

    return app;
};