// set env variable

import User, { IUser } from "../../db/user";
import * as dotenv from "dotenv";
dotenv.config();

// import package
import mongoose from "mongoose";

import createApp from "../../app";

// import db
import { connect } from "../../db/connect";
import {
  checkUser,
  createUser,
  fetchUserById,
  saveUser,
  updateUserToken,
  updateUserVisibility,
} from "../../services/user";

// This creates a new backend in the database

const app = createApp("testUserService");

describe("Testing db services", () => {
  beforeAll(async () => {
    await connect("testUserService");
  });

  afterEach(async () => {
    await User.deleteMany();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  test("Testing isPrivate to true", async () => {
    const user = new User({
      name: "Willy",
      username: "Magician",
      givenName: "Chi",
      middleName: "Wei",
      familyName: "Lien",
      email: "willy@gmail.com",
      emailVerified: true,
      profileImgUrl:
        "https://lh3.googleusercontent.com/a/AEdFTp6LDtlFlsOSWZstQy1jaYLjDcje3Y…",
      backgroundImgUrl:
        "https://lh3.googleusercontent.com/a/AEdFTp6LDtlFlsOSWZstQy1jaYLjDcje3Y…",
      token:
        "https://lh3.googleusercontent.com/a/AEdFTp6LDtlFlsOSWZstQy1jaYLjDcje3Y…c",
      followers: [],
      following: [],
      onboarded: false,
      isPrivate: false,
    });

    const savedUser = await user.save();

    updateUserVisibility("willy@gmail.com", true);

    const updatedUser = await User.findOne({ email: "willy@gmail.com" });
  //  console.log(updatedUser);
    expect(updatedUser.isPrivate).toBe(true);
  });

  // test("Testing isPrivate to false", async () => {
  //   const tonyUser = new User({
  //     name: "Willy",
  //     username: "Magician",
  //     givenName: "Chi",
  //     middleName: "Wei",
  //     familyName: "Lien",
  //     email: "willy@gmail.com",
  //     emailVerified: true,
  //     profileImgUrl:
  //       "https://lh3.googleusercontent.com/a/AEdFTp6LDtlFlsOSWZstQy1jaYLjDcje3Y…",
  //     backgroundImgUrl:
  //       "https://lh3.googleusercontent.com/a/AEdFTp6LDtlFlsOSWZstQy1jaYLjDcje3Y…",
  //     token:
  //       "https://lh3.googleusercontent.com/a/AEdFTp6LDtlFlsOSWZstQy1jaYLjDcje3Y…c",
  //     followers: [],
  //     following: [],
  //     onboarded: false,
  //     isPrivate: true,
  //   });

  //   const savedUser = await tonyUser.save();

  //   console.log(savedUser);

  //   updateUserVisibility("willy@gmail.com", false);

  //   const updatedUser1 = await User.findOne({ email: "willy@gmail.com" });
  //   console.log("Skip")
  //   console.log(updatedUser1);

  //   expect(updatedUser1.isPrivate).toBe(false);
  // });
});
