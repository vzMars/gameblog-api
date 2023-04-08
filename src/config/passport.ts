import { PassportStatic } from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import User from '../models/User';

declare global {
  namespace Express {
    interface User {
      id: string;
    }
  }
}

const options = {
  usernameField: 'email',
  passwordField: 'password',
};

const passportConfig = (passport: PassportStatic) => {
  passport.use(
    new LocalStrategy(options, async (email, password, done) => {
      try {
        const user = await User.findOne({ email });

        if (!user) {
          return done(null, false);
        }

        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
          return done(null, false);
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      return done(err);
    }
  });
};

export default passportConfig;
