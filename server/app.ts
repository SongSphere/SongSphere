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

declare module "express-session" {
  interface SessionData {
    user: IUser;
  }
}

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
      uri: `mongodb+srv://${username}:${password}@${cluster}.1oxopys.mongodb.net/main?retryWrites=true&w=majority`,
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

export default app;
