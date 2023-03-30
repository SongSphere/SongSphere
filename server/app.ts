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
import userRouter from "./routes/user";
import postRouter from "./routes/posting";
import followRouter from "./routes/follow";
import playlistRouter from "./routes/playlist";
import { initScheduledJobs } from "./services/scheduler";

// import middleware
import logger from "./middleware/logger";

// import db
import { IUser } from "./db/user";

declare module "express-session" {
  interface SessionData {
    user: IUser;
  }
}

const createApp = (dbname: string) => {
  const app = express();

  app.use(
    cors({
      origin: [
        "http://localhost:3000",
        "https://euphonious-tartufo-ec255e.netlify.app",
        "https://test.loophole.engineer",
      ],
      methods: ["GET", "PUT", "POST"],
      credentials: true,
      allowedHeaders: ["Content-Type", "Authorization", "x-csrf-token"],
      maxAge: 600,
      exposedHeaders: ["*", "Authorization"],
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
        // secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24, // 1 day,
        // sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        httpOnly: true,
      },
      store: new MongoDBStore({
        uri: `mongodb+srv://${username}:${password}@${cluster}.1oxopys.mongodb.net/${dbname}?retryWrites=true&w=majority`,
        collection: "sessions",
      }),
    })
  );
  initScheduledJobs();
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(logger);

  // set routers
  app.use(sampleRouter);
  app.use(authRouter);
  app.use(userRouter);
  app.use(postRouter);
  app.use(followRouter);
  app.use(playlistRouter);

  // Attached below is how to generate a MusicKit Developer Token for this project
  // I would recommend using the apple-music-token-generator repo though

  // const private_key = fs.readFileSync("./apple_private_key.p8");
  // const team_id = process.env.TEAM_ID;
  // const key_id = process.env.KEY_ID;

  // let now = new Date();
  // let nextMonth = new Date(
  //   now.getFullYear(),
  //   now.getMonth() + 1,
  //   now.getDate()
  // );
  // const nowEpoch = Math.round(now.getTime() / 1000); // number of seconds since Epoch, in UTC
  // let nextMonthEpoch = Math.round(nextMonth.getTime() / 1000); // number of seconds since Epoch, in UTC

  // var payload = {
  //   iss: team_id, // TEAM ID
  //   iat: nowEpoch,
  //   exp: nextMonthEpoch
  // };

  // var options = {
  //   header: {
  //     alg: "ES256",
  //     kid: key_id, // KEY ID
  //   },
  // };

  // jwt.sign(payload, private_key, options, function (error, token) {
  //   console.log(error);
  //   console.log(token);
  // });

  return app;
};

export default createApp;
