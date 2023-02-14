// set env variable
import * as dotenv from "dotenv";
dotenv.config();

// import package
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

// import routers
import sampleRouter from "./routes/sample";
import loginRouter from "./routes/login";

// import middleware
import logger from "./middlewares/logger";

// import db
import { connect } from "./db/connect";

const app = express();
connect();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger);

// set routers
app.use(sampleRouter);
app.use(loginRouter);

const port = process.env.PORT || "8080";

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
