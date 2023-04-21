// set env variable

import User, { IUser } from "../../db/user";
import { TChat } from "../../types/chat";
import * as dotenv from "dotenv";
dotenv.config();

// import package
import mongoose from "mongoose";

import createApp from "../../app";

// import db
import { connect } from "../../db/connect";
import {
  addInvitation,
  addListener,
  deleteInvitation,
  fetchRoomById,
  sendInvitationEmail,
  sendChat,
  fetchChats,
} from "../../services/party-room";
import PartyRoom from "../../db/party-room";
import Post from "../../db/post";
import Comment from "../../db/comment";
import FollowRequest from "../../db/follow-request";
import { TPartyRoom } from "../../types/party-room";

// This creates a new backend in the database
const app = createApp("testChat");

describe("Testing db services", () => {
  beforeAll(async () => {
    await connect("testChat");
  });

  afterEach(async () => {
    await User.deleteMany();
    await PartyRoom.deleteMany();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  /* User Story 9 */
  test("Testing sending a chat", async () => {
    const userA = new User({
      name: "Anthony",
      username: "anthonyfmb",
      givenName: "Anthony",
      familyName: "Baumann",
      email: "anthonyfbaumann@gmail.com",
      emailVerified: true,
      profileImgUrl: "google.com",
      backgroundImgUrl: "google.com",
      token: "idk",
      onboarded: false,
      isPrivate: false,
      showPlayingSong: false,
    });

    const newRoom = new PartyRoom({
      ownerUsername: userA.username,
      ownerEmail: userA.email,
      partyName: "Test Room Party",
      description: "Test Room",
      members: [],
      invitedMembers: [],
      queue: [],
      musicIndex: 0,
    });

    await userA.save();
    await newRoom.save();

    const chat: TChat = {
      sender: "anthonyfmb",
      message: "wow",
    };

    const id = newRoom._id.toString();
    const tRoom: TPartyRoom = {
      _id: id,
      ownerUsername: userA.username,
      ownerEmail: userA.email,
      partyName: "Test Room Party",
      description: "Test Room",
      members: [],
      invitedMembers: [],
      queue: [],
      musicIndex: 0,
      blocked: [],
      chats: [],
    };

    await sendChat(tRoom, chat);

    const foundRoom = await PartyRoom.findOne({
      _id: newRoom._id.toString(),
    });

    expect(foundRoom.chats.length).toBe(1);
    expect(foundRoom.chats[0]).toStrictEqual(chat);
  });

  /* User Story 9 */
  test("Testing fetching chats", async () => {
    const userA = new User({
      name: "Anthony",
      username: "anthonyfmb",
      givenName: "Anthony",
      familyName: "Baumann",
      email: "anthonyfbaumann@gmail.com",
      emailVerified: true,
      profileImgUrl: "google.com",
      backgroundImgUrl: "google.com",
      token: "idk",
      onboarded: false,
      isPrivate: false,
      showPlayingSong: false,
    });

    const newRoom = new PartyRoom({
      ownerUsername: userA.username,
      ownerEmail: userA.email,
      partyName: "Test Room Party",
      description: "Test Room",
      members: [],
      invitedMembers: [],
      queue: [],
      musicIndex: 0,
    });

    await userA.save();
    await newRoom.save();

    const chat: TChat = {
      sender: "anthonyfmb",
      message: "wow",
    };

    const id = newRoom._id.toString();
    const tRoom: TPartyRoom = {
      _id: id,
      ownerUsername: userA.username,
      ownerEmail: userA.email,
      partyName: "Test Room Party",
      description: "Test Room",
      members: [],
      invitedMembers: [],
      queue: [],
      musicIndex: 0,
      blocked: [],
      chats: [],
    };

    await sendChat(tRoom, chat);

    const fetch = await fetchChats(id);

    expect(fetch.chats.length).toBe(1);
    expect(fetch.chats[0]).toStrictEqual(chat);
  });
});
