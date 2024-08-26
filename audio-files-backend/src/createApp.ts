import express, { NextFunction, Request, Response } from "express";
import session from "express-session";
import passport from "passport";
import dotenv from "dotenv";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";
import cors from "cors";

import routes from "./routes";
import "./middlewares/passportMiddleware";
import { InvalidCredentialsError } from "./errors";
import { errorHandler } from "./middlewares";
import cookieParser from "cookie-parser";

dotenv.config();

export function createApp() {
  const app = express();
  app.use(
    cors({
      origin: ["http://localhost:3001"],
      credentials: true,
    })
  );
  app.use(cookieParser());
  app.use(express.json());

  app.use(
    session({
      secret: process.env.SESSION_SECRET || "default-secret",
      saveUninitialized: true,
      resave: false,
      cookie: {
        maxAge: 60000 * 60,
      },
      store: MongoStore.create({
        client: mongoose.connection.getClient(),
      }),
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());
  app.use(routes);
  app.use(errorHandler);

  return app;
}
