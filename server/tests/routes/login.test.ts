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

import app from "../../app";

describe("Testing login route", () => {
  beforeAll(async () => {
    await connect("testLoginRoute");
  });

  afterEach(async () => {
    await User.deleteMany();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  const testToken = process.env.DEBUG_GOOGLE_TOKEN;

  test("Testing sign up", async () => {
    const res = await request(app)
      .post("/api/auth/google")
      .send({ token: testToken });

    expect(res.statusCode).toBe(200);
    const exist = await User.exists({ email: process.env.DEBUG_EMAIL });
    expect(exist != null).toBe(true);
  });
});
