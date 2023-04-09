import { NextFunction, Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import createHttpError = require('http-errors');
import passport from 'passport';
import User from '../models/User';

export const authStatus = (req: Request, res: Response) => {
  // ensureAuth middleware is run before this route is even reached
  // req.user will not be undefined
  const { id, email, username } = req.user!;

  res.status(200).json({
    user: { id, email, username },
  });
};

interface ILoginBody {
  email: string;
  password: string;
}

export const login = (
  req: Request<ParamsDictionary, any, ILoginBody>,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      throw createHttpError(400, 'Please complete all required fields.');
    }

    passport.authenticate(
      'local',
      (err: unknown, user: Express.User, info: unknown) => {
        if (err) return next(err);

        if (!user) {
          throw createHttpError(401, 'Incorrect email or password.');
        }

        req.logIn(user, (err) => {
          if (err) return next(err);
          res.status(200).json({
            user: { id: user.id, email: user.email, username: user.username },
          });
        });
      }
    )(req, res, next);
  } catch (err) {
    next(err);
  }
};

export const logout = (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json('logout');
};

interface ISignUpBody {
  email: string;
  username: string;
  password: string;
}

export const signup = async (
  req: Request<ParamsDictionary, any, ISignUpBody>,
  res: Response,
  next: NextFunction
) => {
  const { email, username, password } = req.body;

  try {
    const user = await User.signup(email, username, password);

    req.logIn(user, (err) => {
      if (err) return next(err);
      res.status(200).json({
        user: { id: user.id, email: user.email, username: user.username },
      });
    });
  } catch (err) {
    next(err);
  }
};
