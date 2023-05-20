import * as dotenv from 'dotenv';
dotenv.config();

import express, { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import createHttpError from 'http-errors';
import env from './utils/validateEnv';
import corsOptions from './config/corsOptions';
import passportConfig from './config/passport';
import connectDB from './config/database';
import errorHandler from './middleware/errorHandler';
import authRoutes from './routes/auth';
import postRoutes from './routes/post';
import userRoutes from './routes/user';

const app = express();

// Passport config
passportConfig(passport);

// Enable CORS
app.use(cors(corsOptions));

// Database Connection
connectDB();

// Secure api
app.use(helmet());

// Body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Logging
app.use(morgan('dev'));

// Sessions
app.use(
  session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: env.DATABASE_URI }),
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/user', userRoutes);
app.use('*', (req: Request, res: Response, next: NextFunction) => {
  next(createHttpError(404, '404 Not Found'));
});

// Error Handler
app.use(errorHandler);

const port = env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
