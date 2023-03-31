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
  removeSpotifyTokens,
  updateSpotifyTokens,
  updateUserVisibility,
} from "../../services/user";




import Comment from "../../db/comment";
import { comment, likeComment, saveComment, unlikeComment } from "../../services/post";
import Seed from "../../seed";
import { addFollow } from "../../services/follow";


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
      showPlayingSong: false,
    });

    const savedUser = await user.save();

    updateUserVisibility("willy@gmail.com", true);

    const updatedUser = await User.findOne({ email: "willy@gmail.com" });
    expect(updatedUser.isPrivate).toBe(true);
  });

  test("Testing isPrivate to false", async () => {
    const user = new User({
      name: "HectorName",
      username: "Hector7",
      givenName: "Hector",
      middleName: "Gustavo",
      familyName: "Martinez",
      email: "hector@gmail.com",
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
      isPrivate: true,
      showPlayingSong: false,
    });

    const savedUser = await user.save();

    await updateUserVisibility("hector@gmail.com", false);

    const updatedUser = await User.findOne({ email: "hector@gmail.com" });
    expect(updatedUser.isPrivate).toBe(false);
  });

  test("Testing making comments", async () => {
    const user = new User({
      name: "Dominic1",
      username: "domdan1",
      givenName: "Dominic1",
      familyName: "Danborn1",
      email: "dominicdanborn1@gmail.com",
      emailVerified: true,
      profileImgUrl: "google.com",
      backgroundImgUrl: "google.com",
      token: "idk",
      onboarded: false,
      isPrivate: false,
      showPlayingSong: false,
    });

    await user.save();

    const comment = new Comment({
      username: "Dominic2",
      userEmail: "dominicdanborn2@gmail.com",
      text: "Create comment test",
      subComments: [],
      like: 0,
    });

    await comment.save()

    const updatedComment = await Comment.findOne({ text: "Create comment test" });
    
  
    expect(updatedComment.text).toBe(comment.text);
    
    

  });

  test("Testing liking comments", async () => {
    const user = new User({
      name: "Dominic2",
      username: "domdan2",
      givenName: "Dominic2",
      familyName: "Danborn2",
      email: "dominicdanborn2@gmail.com",
      emailVerified: true,
      profileImgUrl: "google.com",
      backgroundImgUrl: "google.com",
      token: "idk",
      onboarded: false,
      isPrivate: false,
      showPlayingSong: false,
    });

    await user.save();

    const comment = new Comment({
      username: "Dominic2",
      userEmail: "dominicdanborn2@gmail.com",
      text: "Comment test1",
      subComments: [],
      like: 0,
    });

   

    await comment.save();

    const c = await Comment.findOne({ username: "Dominic2" });
  
    await likeComment(c.id, "dominicdanborn2@gmail.com");

    const updatedComment = await Comment.findOne({ username: "Dominic2" });

    console.log(updatedComment);

    expect(updatedComment.like).toBe(0);

  });

  test("Testing unliking comments", async () => {
    const user = new User({
      name: "Dominic2",
      username: "domdan2",
      givenName: "Dominic2",
      familyName: "Danborn2",
      email: "dominicdanborn2@gmail.com",
      emailVerified: true,
      profileImgUrl: "google.com",
      backgroundImgUrl: "google.com",
      token: "idk",
      onboarded: false,
      isPrivate: false,
      showPlayingSong: false,
    });

    await user.save();

    const comment = new Comment({
      username: "Dominic2",
      userEmail: "dominicdanborn2@gmail.com",
      text: "Comment test1",
      subComments: [],
      like: 0,
    });

   

    await comment.save();

    const c = await Comment.findOne({ username: "Dominic2" });
  
    await unlikeComment(c.id, "dominicdanborn2@gmail.com");

    const updatedComment = await Comment.findOne({ username: "Dominic2" });

    console.log(updatedComment);

    expect(updatedComment.like).toBe(0);

  });

  test("Testing updateSpotifyTokens", async () => {
    const user = new User({
      name: "Dominic",
      username: "domdan",
      givenName: "Dominic",
      familyName: "Danborn",
      email: "dominicdanborn@gmail.com",
      emailVerified: true,
      profileImgUrl: "google.com",
      backgroundImgUrl: "google.com",
      token: "idk",
      onboarded: false,
      isPrivate: false,
      showPlayingSong: false,
    });

    await user.save();

    await updateSpotifyTokens(
      "dominicdanborn@gmail.com",
      "testtoken1234",
      new Date("2023-03-30T19:56:25.923+00:00"),
      "test_refresh_token_1234"
    );

    const updatedUser = await User.findOne({
      email: "dominicdanborn@gmail.com",
    });

    expect(updatedUser.spotifyToken).toBe("testtoken1234");
    expect(updatedUser.spotifyTokenEndDate.toISOString()).toBe(
      "2023-03-30T19:56:25.923Z"
    );
    expect(updatedUser.spotifyRefreshToken).toBe("test_refresh_token_1234");
  });

  test("Testing removeSpotifyTokens", async () => {
    const user = new User({
      name: "Dominic",
      username: "domdan",
      givenName: "Dominic",
      familyName: "Danborn",
      email: "dominicdanborn@gmail.com",
      emailVerified: true,
      profileImgUrl: "google.com",
      backgroundImgUrl: "google.com",
      token: "idk",
      spotifyToken: "testtoken1234",
      spotifyTokenEndDate: new Date("2023-03-30T19:56:25.923+00:00"),
      spotifyRefreshToken: "test_refresh_token_1234",
      onboarded: false,
      isPrivate: false,
      showPlayingSong: false,
    });

    await user.save();

    await removeSpotifyTokens("dominicdanborn@gmail.com");

    const updatedUser = await User.findOne({
      email: "dominicdanborn@gmail.com",
    });

    expect(updatedUser.spotifyToken).toBe(undefined);
    expect(updatedUser.spotifyTokenEndDate).toBe(undefined);
    expect(updatedUser.spotifyRefreshToken).toBe(undefined);
  });

  test("Test Random song of the day", async () => {
    let seed = Seed.getSeed();
    expect(seed).toBe(seed);
  });

  // test("Testing user feed", async () => {
  //   const userA = new User({
  //     name: "Dominic",
  //     username: "domdan",
  //     givenName: "Dominic",
  //     familyName: "Danborn",
  //     email: "dominicdanborn@gmail.com",
  //     emailVerified: true,
  //     profileImgUrl: "google.com",
  //     backgroundImgUrl: "google.com",
  //     token: "idk",
  //     onboarded: false,
  //     isPrivate: false,
  //     showPlayingSong: false,
  //   });
  //   await userA.save();

  //   const userB = new User({
  //     name: "Willy",
  //     username: "magician3124",
  //     givenName: "Chi-Wei",
  //     familyName: "Lien",
  //     email: "crashingballoon@gmail.com",
  //     emailVerified: true,
  //     profileImgUrl: "google.com",
  //     backgroundImgUrl: "google.com",
  //     token: "idk",
  //     onboarded: false,
  //     isPrivate: false,
  //     showPlayingSong: false,
  //   });
  //   await userB.save();

  //   // user A follow user B
  //   addFollow(userB.username, userA.username);
  // });
});
