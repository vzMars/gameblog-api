import { Schema, model, Types } from 'mongoose';

interface IPost {
  id: string;
  title: string;
  content: string;
  image: string;
  cloudinaryId: string;
  tag: string;
  user: Types.ObjectId;
}

const PostSchema = new Schema<IPost>(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    cloudinaryId: {
      type: String,
      required: true,
    },
    tag: {
      type: String,
      enum: ['gaming', 'movies', 'tv', 'tech', 'comics', 'anime'],
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

const Post = model<IPost>('Post', PostSchema);

export default Post;
