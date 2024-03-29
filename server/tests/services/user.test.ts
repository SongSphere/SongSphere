// set env variable

import User, { IUser } from "../../db/user";
import * as dotenv from "dotenv";
dotenv.config();

// import package
import mongoose from "mongoose";

import createApp from "../../app";

// import db
import { connect } from "../../db/connect";
import { updateUserBio } from "../../services/user";

import {
  fetchFeed,
  fetchUserbyUserName,
  removeSpotifyTokens,
  updateSpotifyTokens,
  updateUserVisibility,
} from "../../services/user";

import { likeComment, unlikeComment } from "../../services/post";
import Seed from "../../seed";
import { addFollow } from "../../services/follow";
import { createPost, savePost } from "../../services/post";
import { TPost } from "../../types/post";
import Post from "../../db/post";
import Comment from "../../db/comment";
import { fetchPlaylist } from "../../services/playlist";

// This creates a new backend in the database

const app = createApp("testUserService");

describe("Testing db services", () => {
  beforeAll(async () => {
    await connect("testUserService");
  });

  afterEach(async () => {
    await Comment.deleteMany();
    await Post.deleteMany();
    await User.deleteMany();
    await Comment.deleteMany();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  /* User Story 13 */
  test("Test Update Bio", async () => {
    const bio = "today is a nice day";
    const userA = new User({
      name: "Willy",
      username: "magician3124",
      givenName: "Chi-Wei",
      familyName: "Lien",
      email: "crashingballoon@gmail.com",
      emailVerified: true,
      biography: "",
      profileImgUrl: "google.com",
      backgroundImgUrl: "google.com",
      token: "idk",
      onboarded: false,
      isPrivate: false,
      showPlayingSong: false,
    });
    await userA.save();

    await updateUserBio(userA.username, bio);
    let newUserA = await fetchUserbyUserName(userA.username);
    // console.log(newUserA);
    expect(newUserA.biography).toBe(bio);
  });
});
