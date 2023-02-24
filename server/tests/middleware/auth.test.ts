// set env variable
import * as dotenv from "dotenv";
dotenv.config();

// import package
import mongoose from "mongoose";
import { Request, Response, NextFunction, response } from "express";
import request from "supertest";

// import services
import { checkUser } from "../../services/db";

// import db
import { connect } from "../../db/connect";
import User, { IUser } from "../../db/user";

import createApp from "../../app";

const app = createApp("testAuthMiddleware");

describe("Testing auth middleware", () => {
  beforeAll(async () => {
    await connect("testAuthMiddleware");
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  const testToken = process.env.DEBUG_GOOGLE_TOKEN;

  test("Testing middleware", async () => {
    const testAuthFail = await request(app)
      .get("/api/testauth")
      .send({ token: testToken });
    expect(testAuthFail.statusCode).toBe(403);

    const res = await request(app)
      .post("/api/auth/google")
      .send({ token: testToken });

    const cookies = res.headers["set-cookie"];
    const testAuthSuccess = await request(app)
      .get("/api/testauth")
      .set("Cookie", cookies)
      .send({ token: testToken });

    expect(testAuthSuccess.statusCode).toBe(200);
  });
});
