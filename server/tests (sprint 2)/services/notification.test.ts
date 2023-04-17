// set env variable

import User, { IUser } from "../../db/user";
import * as dotenv from "dotenv";
dotenv.config();

// import package
import mongoose from "mongoose";

import createApp from "../../app";

// import db
import { connect } from "../../db/connect";

import Comment from "../../db/comment";

import { TNotification } from "../../types/notification";
import { saveNotification } from "../../services/post";
import { INotification } from "../../db/notification";
import Notifications from "../../db/notification";

// This creates a new backend in the database

const app = createApp("testNotificationService");

describe("Testing db services", () => {
  beforeAll(async () => {
    await connect("testNotificationService");
  });

  afterEach(async () => {
    await User.deleteMany();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  test("Testing notification service for like Comment", async () => {
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

    const userB = new User({
      name: "Willy",
      username: "magician3124",
      givenName: "Chi-Wei",
      familyName: "Lien",
      email: "crashingballoon@gmail.com",
      emailVerified: true,
      profileImgUrl: "google.com",
      backgroundImgUrl: "google.com",
      token: "idk",
      onboarded: false,
      isPrivate: false,
      showPlayingSong: false,
    });

    const comment = new Comment({
      username: "Dominic2",
      userEmail: "dominicdanborn2@gmail.com",
      text: "Comment test1",
      subComments: [],
      like: 0,
    });

    await user.save();
    await userB.save();

    await comment.save();

    const newNotification = new Notifications({
      userEmailSender: user.email,
      userEmailReceiver: userB.email,
      notificationType: "Like",
      text: `${user.username} liked your post!`,
    });

    await newNotification.save();

    const notificationSent = await Notifications.findOne({
      userEmailReceiver: userB.email,
    });

    expect(notificationSent.userEmailReceiver).toBe(userB.email);
  });

  test("Testing notification service for comment on comment", async () => {
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

    const userB = new User({
      name: "Willy",
      username: "magician3124",
      givenName: "Chi-Wei",
      familyName: "Lien",
      email: "crashingballoon@gmail.com",
      emailVerified: true,
      profileImgUrl: "google.com",
      backgroundImgUrl: "google.com",
      token: "idk",
      onboarded: false,
      isPrivate: false,
      showPlayingSong: false,
    });

    const comment = new Comment({
      username: "Dominic2",
      userEmail: "dominicdanborn2@gmail.com",
      text: "Comment test1",
      subComments: [],
      like: 0,
    });

    await user.save();
    await userB.save();

    await comment.save();

    const newNotification = new Notifications({
      userEmailSender: user.email,
      userEmailReceiver: userB.email,
      notificationType: "Comment",
      text: `${user.username} commented on your comment!`,
    });

    await newNotification.save();

    const notificationSent = await Notifications.findOne({
      userEmailReceiver: userB.email,
    });

    expect(notificationSent.userEmailReceiver).toBe(userB.email);
  });

  test("Testing notification service for comment", async () => {
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

    const userB = new User({
      name: "Willy",
      username: "magician3124",
      givenName: "Chi-Wei",
      familyName: "Lien",
      email: "crashingballoon@gmail.com",
      emailVerified: true,
      profileImgUrl: "google.com",
      backgroundImgUrl: "google.com",
      token: "idk",
      onboarded: false,
      isPrivate: false,
      showPlayingSong: false,
    });

    const comment = new Comment({
      username: "Dominic2",
      userEmail: "dominicdanborn2@gmail.com",
      text: "Comment test1",
      subComments: [],
      like: 0,
    });

    await user.save();
    await userB.save();

    await comment.save();

    const newNotification = new Notifications({
      userEmailSender: user.email,
      userEmailReceiver: userB.email,
      notificationType: "Comment",
      text: `${user.username} commented on your post!`,
    });

    await newNotification.save();

    const notificationSent = await Notifications.findOne({
      userEmailReceiver: userB.email,
    });

    expect(notificationSent.userEmailReceiver).toBe(userB.email);
  });

  test("Testing notification service for follow", async () => {
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

    const userB = new User({
      name: "Willy",
      username: "magician3124",
      givenName: "Chi-Wei",
      familyName: "Lien",
      email: "crashingballoon@gmail.com",
      emailVerified: true,
      profileImgUrl: "google.com",
      backgroundImgUrl: "google.com",
      token: "idk",
      onboarded: false,
      isPrivate: false,
      showPlayingSong: false,
    });

    const comment = new Comment({
      username: "Dominic2",
      userEmail: "dominicdanborn2@gmail.com",
      text: "Comment test1",
      subComments: [],
      like: 0,
    });

    await user.save();
    await userB.save();

    await comment.save();

    const newNotification = new Notifications({
      userEmailSender: user.email,
      userEmailReceiver: userB.email,
      notificationType: "Follow",
      text: `${user.username} Followed You`,
    });

    await newNotification.save();

    const notificationSent = await Notifications.findOne({
      userEmailReceiver: userB.email,
    });

    expect(notificationSent.userEmailReceiver).toBe(userB.email);
  });

  test("Testing notification service like on post", async () => {
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

    const userB = new User({
      name: "Willy",
      username: "magician3124",
      givenName: "Chi-Wei",
      familyName: "Lien",
      email: "crashingballoon@gmail.com",
      emailVerified: true,
      profileImgUrl: "google.com",
      backgroundImgUrl: "google.com",
      token: "idk",
      onboarded: false,
      isPrivate: false,
      showPlayingSong: false,
    });

    const comment = new Comment({
      username: "Dominic2",
      userEmail: "dominicdanborn2@gmail.com",
      text: "Comment test1",
      subComments: [],
      like: 0,
    });

    await user.save();
    await userB.save();

    await comment.save();

    const newNotification = new Notifications({
      userEmailSender: user.email,
      userEmailReceiver: userB.email,
      notificationType: "Like",
      text: `${user.username} Like on Post`,
    });

    await newNotification.save();

    const notificationSent = await Notifications.findOne({
      userEmailReceiver: userB.email,
    });

    expect(notificationSent.userEmailReceiver).toBe(userB.email);
  });

  test("Testing notification service like on Comment", async () => {
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

    const userB = new User({
      name: "Willy",
      username: "magician3124",
      givenName: "Chi-Wei",
      familyName: "Lien",
      email: "crashingballoon@gmail.com",
      emailVerified: true,
      profileImgUrl: "google.com",
      backgroundImgUrl: "google.com",
      token: "idk",
      onboarded: false,
      isPrivate: false,
      showPlayingSong: false,
    });

    const comment = new Comment({
      username: "Dominic2",
      userEmail: "dominicdanborn2@gmail.com",
      text: "Comment test1",
      subComments: [],
      like: 0,
    });

    await user.save();
    await userB.save();

    await comment.save();

    const newNotification = new Notifications({
      userEmailSender: user.email,
      userEmailReceiver: userB.email,
      notificationType: "Like",
      text: `${user.username} Like on Comment`,
    });

    await newNotification.save();

    const notificationSent = await Notifications.findOne({
      userEmailReceiver: userB.email,
    });

    expect(notificationSent.userEmailReceiver).toBe(userB.email);
  });
});
