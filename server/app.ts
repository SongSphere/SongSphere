// set env variable
import * as dotenv from "dotenv";
dotenv.config();

// import package
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import session from "express-session";

import { default as connectMongoDBSession } from "connect-mongodb-session";

const MongoDBStore = connectMongoDBSession(session);

// import routers
import sampleRouter from "./routes/sample";
import authRouter from "./routes/auth";

// import middleware
import logger from "./middleware/logger";

// import db
import { IUser } from "./db/user";

import jwt from "jsonwebtoken";
import fs from "fs";

declare module "express-session" {
  interface SessionData {
    user: IUser;
  }
}

const createApp = (dbname: string) => {
  const app = express();

  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );
  app.use(cookieParser());

  const username = process.env.DB_USER_NAME;
  const password = process.env.DB_PASSWORD;
  const cluster = process.env.DB_CLUSTER;

  app.use(
    session({
      name: "ssid",
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24, // 1 day
      },
      store: new MongoDBStore({
        uri: `mongodb+srv://${username}:${password}@${cluster}.1oxopys.mongodb.net/${dbname}?retryWrites=true&w=majority`,
        collection: "sessions",
      }),
    })
  );
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(logger);

  // set routers
  app.use(sampleRouter);
  app.use(authRouter);

  const private_key = fs.readFileSync("./apple_private_key.p8");
  const team_id = "";
  const key_id = "36W7MRZQ7M";

  const token = jwt.sign({}, private_key, {
    algorithm: "ES256",
    expiresIn: "180d",
    issuer: team_id,
    header: {
      alg: "ES256",
      kid: key_id,
    },
  });

  app.get("/token", async function (req, res) {
    //if (req.query.key === token_key) {
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify({ token: token }));
    //const music = MusicKit.getInstance();
    //console.log(MusicKit);
    //await music.authorize();
  });

  return app;
};

export default createApp;
