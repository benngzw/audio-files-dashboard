import express from "express";
import session from "express-session";
import passport from "passport";
import dotenv from "dotenv";

import routes from "./routes";

dotenv.config();

export function createApp() {
  const app = express();
  app.use(express.json());

  app.use(
    session({
      secret: process.env.SESSION_SECRET || "default-secret",
      saveUninitialized: true,
      resave: false,
      cookie: {
        maxAge: 60000 * 60,
      },
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());
  app.use(routes);

  return app;
}
