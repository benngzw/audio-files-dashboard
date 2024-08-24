import passport from "passport";
import { Strategy } from "passport-local";

import { User, UserModel } from "../../mongoose/schemas/user";
import { comparePassword } from "../../utils/password";
import { FlattenMaps, Types } from "mongoose";

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const findUser = await UserModel.findById(id).lean();
    if (!findUser) throw new Error("User Not Found");
    done(null, findUser);
  } catch (err) {
    done(err, null);
  }
});

export default passport.use(
  new Strategy(async (username, password, done) => {
    try {
      const findUser = await UserModel.findOne({ username });
      if (!findUser) throw new Error("User not found");
      if (!comparePassword(password, findUser.password))
        throw new Error("Bad Credentials");
      done(null, findUser);
    } catch (err) {
      done(err, false);
    }
  })
);
