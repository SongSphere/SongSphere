// set env variable
import * as dotenv from "dotenv";
dotenv.config();

// import package
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import session from "express-session";

// import routers
import sampleRouter from "./routes/sample";
import loginRouter from "./routes/login";

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
app.use(
  session({
    name: "ssid",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: process.env.NODE_ENV === "production" },
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger);

// set routers
app.use(sampleRouter);
app.use(loginRouter);

export default app;
