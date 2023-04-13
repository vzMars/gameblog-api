import { NextFunction, Request, Response } from 'express';

export const getPosts = (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send('get posts');
};

export const getPost = (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send('get post');
};

export const createPost = (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send('create post');
};

export const updatePost = (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send('update post');
};

export const deletePost = (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send('delete post');
};
