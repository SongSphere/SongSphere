// set env variable

import User, { IUser } from "../../db/user";
import * as dotenv from "dotenv";
dotenv.config();

// import package
import mongoose from "mongoose";

import createApp from "../../app";

// import db
import { connect } from "../../db/connect";


// This creates a new backend in the database

const app = createApp("testRepost");

describe("Testing repost", () => {
    beforeAll(async () => {
        await connect("testRepost");
      });
})