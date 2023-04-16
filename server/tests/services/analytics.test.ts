// set env variable

import User from "../../db/user";
import Post from "../../db/post";
import { TMusicContent } from "../../types/music-content";
import * as dotenv from "dotenv";
dotenv.config();

// import package
import mongoose from "mongoose";

import createApp from "../../app";

// import db
import { connect } from "../../db/connect";

import { getAnalytics } from "../../services/user";
import { TComment } from "../../types/comment";

// This creates a new backend in the database

const app = createApp("testListeningService");

describe("Testing db services", () => {
  beforeAll(async () => {
    await connect("testPostAnalytics");
  });

  afterEach(async () => {
    await User.deleteMany();
    await Post.deleteMany();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  test("Testing getAnalytics", async () => {
    const user1 = new User({
      name: "Anthony",
      username: "anthonyfmb",
      givenName: "Anthony",
      familyName: "Baumann",
      email: "anthonyfbaumann@gmail.com",
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

    const song: TMusicContent = {
      name: "song",
      artist: "the artist of the song",
      albumName: "album name of the song of the artist",
      id: "123",
      cover: "wow",
    };

    const comment: TComment = {
      username: "anthonyfmb",
      userEmail: "anthonyfbaumann@gmail.com",
      text: "asoidj",
      like: 0,
    };

    const post1 = new Post({
      id: 123,
      username: "anthonyfmb",
      userEmail: "anthonyfbaumann@gmail.com",
      caption: "a",
      music: song,
      comments: [],
      likes: 1,
      repost: false,
    });

    await user1.save();
    await post1.save();

    let a = await getAnalytics("anthonyfbaumann@gmail.com");

    // 0: total likes
    // 1: avg likes
    // 2: total comments
    // 3: avg comments

    expect(a[0]).toBe(1);
    expect(a[1]).toBe(1);
    expect(a[2]).toBe(0);
    expect(a[3]).toBe(0);

    const post2 = new Post({
      id: 1234,
      username: "anthonyfmb",
      userEmail: "anthonyfbaumann@gmail.com",
      caption: "ii",
      music: song,
      comments: [comment],
      likes: 0,
      repost: false,
    });

    await post2.save();

    a = await getAnalytics("anthonyfbaumann@gmail.com");

    expect(a[0]).toBe(1);
    expect(a[1]).toBe(0.5);
    expect(a[2]).toBe(1);
    expect(a[3]).toBe(0.5);
  });
});
