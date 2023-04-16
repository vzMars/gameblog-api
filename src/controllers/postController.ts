import { NextFunction, Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import createHttpError = require('http-errors');
import Post from '../models/Post';
import cloudinary from '../middleware/cloudinary';

export const getPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const posts = await Post.find().populate('user', 'username').sort({
      createdAt: -1,
    });

    res.status(200).json(posts);
  } catch (err) {
    next(err);
  }
};

export const getTag = (req: Request, res: Response, next: NextFunction) => {
  const { tag } = req.params;

  try {
    const validTags: string[] = Post.schema.path('tag').options.enum;

    if (!validTags.includes(tag.toLowerCase())) {
      throw createHttpError(400, 'Tag not found.');
    }

    res.status(200).json(tag.toLowerCase());
  } catch (err) {
    next(err);
  }
};

export const getPost = (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send('get post');
};

interface ICreateBody {
  title: string;
  content: string;
  tag: string;
}

export const createPost = async (
  req: Request<ParamsDictionary, any, ICreateBody>,
  res: Response,
  next: NextFunction
) => {
  const { title, content, tag } = req.body;
  const file = req.file;
  const user = req.user;

  try {
    if (!user) {
      throw createHttpError(401, 'You must be logged in to create a post.');
    }

    if (!title || !content || !tag || !file) {
      throw createHttpError(400, 'Please complete all required fields.');
    }

    const result = await cloudinary.uploader.upload(file.path);

    const post = await Post.create({
      title,
      content,
      image: result.secure_url,
      cloudinaryId: result.public_id,
      tag,
      user: user.id,
    });

    await post.populate('user', 'username');

    res.status(200).json(post);
  } catch (err) {
    next(err);
  }
};

export const updatePost = (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send('update post');
};

export const deletePost = (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send('delete post');
};
