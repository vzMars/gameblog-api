import { NextFunction, Request, Response } from 'express';
import createHttpError = require('http-errors');
import User from '../models/User';

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username } = req.params;

  try {
    const user = await User.findOne({ username }).collation({
      locale: 'en',
      strength: 2,
    });

    if (!user) {
      throw createHttpError(400, 'Profile not found.');
    }

    res.status(200).json(user.username);
  } catch (err) {
    next(err);
  }
};
