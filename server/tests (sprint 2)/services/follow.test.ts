// set env variable

import User from "../../db/user";
import * as dotenv from "dotenv";
dotenv.config();

// import package
import mongoose from "mongoose";

import createApp from "../../app";

// import db
import { connect } from "../../db/connect";
import {
  addBlockedAccount,
  addFollow,
  removeFollow,
  unBlockAccount,
} from "../../services/follow";
import { doesNotMatch } from "assert";

// This creates a new backend in the database

const app = createApp("testFollowService");

describe("Testing db services", () => {
  beforeAll(async () => {
    await connect("testFollowService");
  });

  afterEach(async () => {
    await User.deleteMany();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  test("Testing addFollow", async () => {
    const user1 = new User({
      name: "Dominic",
      username: "domdan",
      givenName: "Dominic",
      familyName: "Danborn",
      email: "dominicdanborn@gmail.com",
      emailVerified: true,
      profileImgUrl: "google.com",
      backgroundImgUrl: "google.com",
      token: "idk",
      followers: [],
      following: [],
      blockedUsers: [],
      blockedBy: [],
      onboarded: false,
      isPrivate: false,
      showPlayingSong: false,
    });

    const user2 = new User({
      name: "Willy",
      username: "magician1234",
      givenName: "Willy",
      familyName: "Lien",
      email: "crashingballoon@gmail.com",
      emailVerified: true,
      profileImgUrl: "google.com",
      backgroundImgUrl: "google.com",
      token: "idk",
      followers: [],
      following: [],
      blockedUsers: [],
      blockedBy: [],
      onboarded: false,
      isPrivate: false,
      showPlayingSong: false,
    });

    await user1.save();
    await user2.save();

    await addFollow("magician1234", "domdan");

    const updatedUser1 = await User.findOne({
      email: "dominicdanborn@gmail.com",
    });

    const updatedUser2 = await User.findOne({
      email: "crashingballoon@gmail.com",
    });

   
    expect(updatedUser1.following[0]).toBe("magician1234");
    expect(updatedUser2.followers[0]).toBe("domdan");
  });

  test("Testing removeFollow", async () => {
    const user1 = new User({
      name: "Dominic",
      username: "domdan",
      givenName: "Dominic",
      familyName: "Danborn",
      email: "dominicdanborn@gmail.com",
      emailVerified: true,
      profileImgUrl: "google.com",
      backgroundImgUrl: "google.com",
      token: "idk",
      followers: [],
      following: ["magician1234"],
      blockedUsers: [],
      blockedBy: [],
      onboarded: false,
      isPrivate: false,
      showPlayingSong: false,
    });

    const user2 = new User({
      name: "Willy",
      username: "magician1234",
      givenName: "Willy",
      familyName: "Lien",
      email: "crashingballoon@gmail.com",
      emailVerified: true,
      profileImgUrl: "google.com",
      backgroundImgUrl: "google.com",
      token: "idk",
      followers: ["domdan"],
      following: [],
      blockedUsers: [],
      blockedBy: [],
      onboarded: false,
      isPrivate: false,
      showPlayingSong: false,
    });

    await user1.save();
    await user2.save();

    await removeFollow("magician1234", "domdan");

    const updatedUser1 = await User.findOne({
      email: "dominicdanborn@gmail.com",
    });

    const updatedUser2 = await User.findOne({
      email: "crashingballoon@gmail.com",
    });

    expect(updatedUser1.following[0]).toBe(undefined);
    expect(updatedUser2.followers[0]).toBe(undefined);
  });

  test("Testing addBlockedAccount", async () => {
    const user1 = new User({
      name: "Dominic",
      username: "domdan",
      givenName: "Dominic",
      familyName: "Danborn",
      email: "dominicdanborn@gmail.com",
      emailVerified: true,
      profileImgUrl: "google.com",
      backgroundImgUrl: "google.com",
      token: "idk",
      followers: [],
      following: [],
      blockedUsers: [],
      blockedBy: [],
      onboarded: false,
      isPrivate: false,
      showPlayingSong: false,
    });

    const user2 = new User({
      name: "Willy",
      username: "magician1234",
      givenName: "Willy",
      familyName: "Lien",
      email: "crashingballoon@gmail.com",
      emailVerified: true,
      profileImgUrl: "google.com",
      backgroundImgUrl: "google.com",
      token: "idk",
      followers: [],
      following: [],
      blockedUsers: [],
      blockedBy: [],
      onboarded: false,
      isPrivate: false,
      showPlayingSong: false,
    });

    await user1.save();
    await user2.save();

    await addBlockedAccount(
      "dominicdanborn@gmail.com",
      "domdan",
      "magician1234",
      "crashingballoon@gmail.com"
    );

    const updatedUser1 = await User.findOne({
      email: "dominicdanborn@gmail.com",
    });

    const updatedUser2 = await User.findOne({
      email: "crashingballoon@gmail.com",
    });

    expect(updatedUser1.blockedUsers[0]).toBe("magician1234");
    expect(updatedUser2.blockedBy[0]).toBe("domdan");
  });

  test("Testing unBlockAccount", async () => {
    const user1 = new User({
      name: "Dominic",
      username: "domdan",
      givenName: "Dominic",
      familyName: "Danborn",
      email: "dominicdanborn@gmail.com",
      emailVerified: true,
      profileImgUrl: "google.com",
      backgroundImgUrl: "google.com",
      token: "idk",
      followers: [],
      following: [],
      blockedUsers: ["magician1234"],
      blockedBy: [],
      onboarded: false,
      isPrivate: false,
      showPlayingSong: false,
    });

    const user2 = new User({
      name: "Willy",
      username: "magician1234",
      givenName: "Willy",
      familyName: "Lien",
      email: "crashingballoon@gmail.com",
      emailVerified: true,
      profileImgUrl: "google.com",
      backgroundImgUrl: "google.com",
      token: "idk",
      followers: [],
      following: [],
      blockedUsers: [],
      blockedBy: ["domdan"],
      onboarded: false,
      isPrivate: false,
      showPlayingSong: false,
    });

    await user1.save();
    await user2.save();

    await unBlockAccount(
      "domdan",
      "magician1234",
      "crashingballoon@gmail.com",
      "dominicdanborn@gmail.com"
    );

    const updatedUser1 = await User.findOne({
      email: "dominicdanborn@gmail.com",
    });

    const updatedUser2 = await User.findOne({
      email: "crashingballoon@gmail.com",
    });

    expect(updatedUser1.blockedUsers[0]).toBe(undefined);
    expect(updatedUser2.blockedBy[0]).toBe(undefined);
  });
});
