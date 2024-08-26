import passport from "passport";
import { Strategy } from "passport-local";

import { UserModel } from "../models/userModel";
import { comparePassword } from "../utils/password";
import { InvalidCredentialsError } from "../errors";

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const findUser = await UserModel.findById(id).lean();
    if (!findUser) throw new Error("User Not Found");
    done(null, {
      id: findUser._id,
      username: findUser.username,
      password: findUser.password,
      displayName: findUser.displayName,
      isAdmin: findUser.isAdmin,
    });
  } catch (err) {
    done(err, null);
  }
});

export default passport.use(
  new Strategy(async (username, password, done) => {
    try {
      const findUser = await UserModel.findOne({ username });
      if (!findUser || !comparePassword(password, findUser.password))
        throw new InvalidCredentialsError();
      done(null, {
        id: findUser._id,
        username: findUser.username,
        password: findUser.password,
        displayName: findUser.displayName,
        isAdmin: findUser.isAdmin,
      });
    } catch (err) {
      done(err, false);
    }
  })
);
