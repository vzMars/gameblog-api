import * as dotenv from 'dotenv';
dotenv.config();

import env from './utils/validateEnv';
import express, { Request, Response } from 'express';
import connectDB from './config/database';

const app = express();

connectDB();

app.get('/', (req: Request, res: Response) => {
  res.send('hello server');
});

const PORT = env.PORT;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
