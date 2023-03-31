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

import {
  getFriendActivity,
  setPlayingSong,
  setShowSong,
} from "../../services/user";

// This creates a new backend in the database

const app = createApp("testListeningService");

describe("Testing db services", () => {
  beforeAll(async () => {
    await connect("testListeningService");
  });

  afterEach(async () => {
    await User.deleteMany();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  test("Testing getActivity", async () => {
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
      currentlyPlayingSong: {
        name: "song",
        artist: "the artist",
        albumName: "album the name",
        id: 123,
        cover: "",
      },
      showPlayingSong: true,
    });

    await user1.save();
    await user2.save();

    await addFollow("magician1234", "domdan");

    const activity = await getFriendActivity("dominicdanborn@gmail.com");

    expect(activity[0].song.name).toBe("song");
    expect(activity[0].user.username).toBe("magician1234");
  });

  test("Testing setPlayingSong", async () => {
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
      showPlayingSong: true,
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
      showPlayingSong: true,
    });

    await user1.save();
    await user2.save();

    await setPlayingSong("crashingballoon@gmail.com", {
      name: "song name",
      id: "1235",
      cover: "s",
    });

    const activity = await getFriendActivity("dominicdanborn@gmail.com");

    expect(activity[0].song.name).toBe("song name");
    expect(activity[0].user.username).toBe("magician1234");
  });

  test("Testing setShowSong", async () => {
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

    await user1.save();

    await setShowSong("dominicdanborn@gmail.com", true);

    const user = await User.findOne({ email: "dominicdanborn@gmail.com" });

    expect(user.showPlayingSong).toBe(true);
  });
});
