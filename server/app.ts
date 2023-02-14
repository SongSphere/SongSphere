// set env variable
import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import cookieParser from "cookie-parser";

import sampleRouter from "./routes/sample";

const app = express();
app.use(cookieParser());

// set routers
app.use(sampleRouter);

const port = process.env.PORT || "8080";

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});