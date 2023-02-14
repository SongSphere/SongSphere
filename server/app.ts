import * as dotenv from "dotenv";
dotenv.config();

import express from 'express';
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser());

const port = process.env.PORT || "8080";


app.get('/', (req, res) => {
    res.send('Welcome to the backend!');
});

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});