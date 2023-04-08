import { Schema, Model, model, HydratedDocument } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';
import createHttpError = require('http-errors');

interface IUser {
  id: string;
  email: string;
  username: string;
  password: string;
}

interface IUserMethods {
  comparePassword(password: string): Promise<boolean>;
}

interface UserModel extends Model<IUser, {}, IUserMethods> {
  signup(
    email: string,
    username: string,
    password: string
  ): Promise<HydratedDocument<IUser, IUserMethods>>;
}

const UserSchema = new Schema<IUser, UserModel, IUserMethods>({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
});

UserSchema.statics.signup = async function (
  email: string,
  username: string,
  password: string
) {
  if (!email || !username || !password) {
    throw createHttpError(400, 'Please complete all required fields.');
  }

  if (!validator.isEmail(email)) {
    throw createHttpError(400, 'The email must be a valid email address.');
  }

  if (!validator.isLength(username, { min: 2, max: 20 })) {
    if (username.length < 2) {
      throw createHttpError(400, 'The username must be at least 2 characters.');
    }
    throw createHttpError(
      400,
      'The username may not be greater than 20 characters.'
    );
  }

  if (!validator.isAlphanumeric(username)) {
    throw createHttpError(
      400,
      'The username may only contain letters and numbers.'
    );
  }

  if (!validator.isStrongPassword(password)) {
    throw createHttpError(400, 'The password is not strong enough.');
  }

  const existingUser = await this.findOne({
    $or: [{ email }, { username }],
  }).collation({ locale: 'en', strength: 2 });

  if (existingUser) {
    throw createHttpError(409, 'The username or email has already been taken.');
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, username, password: hash });

  return user;
};

UserSchema.methods.comparePassword = async function (password) {
  const match = await bcrypt.compare(password, this.password);
  return match;
};

const User = model<IUser, UserModel>('User', UserSchema);

export default User;
