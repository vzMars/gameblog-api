import * as dotenv from 'dotenv';
dotenv.config();

import env from './utils/validateEnv';
import express, { Request, Response } from 'express';
import morgan from 'morgan';
import errorHandler from './middleware/errorHandler';
import cors from 'cors';
import corsOptions from './config/corsOptions';
import connectDB from './config/database';

const app = express();

app.use(cors(corsOptions));

connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(morgan('dev'));

app.get('/', (req: Request, res: Response) => {
  res.send('hello server');
});

app.use(errorHandler);

const PORT = env.PORT;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
