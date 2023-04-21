// set env variable

import User from "../../db/user";
import PartyRoom from "../../db/party-room";
import { TMusicContent } from "../../types/music-content";
import * as dotenv from "dotenv";
dotenv.config();

// import package
import mongoose from "mongoose";

import createApp from "../../app";

// import db
import { connect } from "../../db/connect";

import {
  addToQueue,
  removeFromQueue,
  moveDownQueue,
  moveUpQueue,
  fetchRoomByOwner,
} from "../../services/party-room";

// This creates a new backend in the database

const app = createApp("testListeningService");

describe("Testing db services", () => {
  beforeAll(async () => {
    await connect("testPartyRoomAddRemoveReorder");
  });

  afterEach(async () => {
    await User.deleteMany();
    await PartyRoom.deleteMany();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  /* User Story 3 */
  test("Testing addToQueue", async () => {
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

    const room = new PartyRoom({
      ownerUsername: "anthonyfmb",
      ownerEmail: "anthonyfbaumann@gmail.com",
      partyName: "room",
      description: "h",
      members: ["anthonyfmb"],
      invitedMembers: [],
      queue: [],
      musicIndex: 0,
    });

    await user1.save();
    await room.save();

    const song: TMusicContent = {
      name: "song",
      artist: "the artist of the song",
      albumName: "album name of the song of the artist",
      id: "123",
      cover: "wow",
    };

    await addToQueue(song, "anthonyfmb").catch((error) => {
      console.log(error);
    });
    const room2 = await fetchRoomByOwner("anthonyfmb");
    expect(room2.queue.length).toBe(1);
  });

  /* User Story 3 */
  test("Testing removeFromQueue", async () => {
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

    const room = new PartyRoom({
      ownerUsername: "anthonyfmb",
      ownerEmail: "anthonyfbaumann@gmail.com",
      partyName: "room",
      description: "h",
      members: ["anthonyfmb"],
      invitedMembers: [],
      queue: [],
      musicIndex: 0,
    });

    await user1.save();
    await room.save();

    const song: TMusicContent = {
      name: "song",
      artist: "the artist of the song",
      albumName: "album name of the song of the artist",
      id: "123",
      cover: "wow",
    };

    await addToQueue(song, "anthonyfmb").catch((error) => {
      console.log(error);
    });
    const room2 = await fetchRoomByOwner("anthonyfmb");
    expect(room2.queue.length).toBe(1);

    await removeFromQueue(0, "anthonyfmb");
    const room3 = await fetchRoomByOwner("anthonyfmb");
    expect(room3.queue.length).toBe(0);
  });

  /* User Story 3 */
  test("Testing moveUpQueue", async () => {
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

    const room = new PartyRoom({
      ownerUsername: "anthonyfmb",
      ownerEmail: "anthonyfbaumann@gmail.com",
      partyName: "room",
      description: "h",
      members: ["anthonyfmb"],
      invitedMembers: [],
      queue: [],
      musicIndex: 0,
    });

    await user1.save();
    await room.save();

    const song1: TMusicContent = {
      name: "song1",
      artist: "the artist of the song",
      albumName: "album name of the song of the artist",
      id: "123",
      cover: "wow",
    };

    const song2: TMusicContent = {
      name: "song2",
      artist: "the artist of the song",
      albumName: "album name of the song of the artist",
      id: "1234",
      cover: "wow",
    };

    await addToQueue(song1, "anthonyfmb");
    await addToQueue(song2, "anthonyfmb");

    const room1 = await fetchRoomByOwner("anthonyfmb");

    expect(room1.queue[0].name).toBe("song1");

    await moveUpQueue(1, "anthonyfmb");
    const room2 = await fetchRoomByOwner("anthonyfmb");
    expect(room2.queue[0].name).toBe("song2");

    // Testing bounds
    await moveUpQueue(0, "anthonyfmb");
    const room3 = await fetchRoomByOwner("anthonyfmb");
    expect(room3.queue[0].name).toBe("song2");
  });

  /* User Story 3 */
  test("Testing moveDownQueue", async () => {
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

    const room = new PartyRoom({
      ownerUsername: "anthonyfmb",
      ownerEmail: "anthonyfbaumann@gmail.com",
      partyName: "room",
      description: "h",
      members: ["anthonyfmb"],
      invitedMembers: [],
      queue: [],
      musicIndex: 0,
    });

    await user1.save();
    await room.save();

    const song1: TMusicContent = {
      name: "song1",
      artist: "the artist of the song",
      albumName: "album name of the song of the artist",
      id: "123",
      cover: "wow",
    };

    const song2: TMusicContent = {
      name: "song2",
      artist: "the artist of the song",
      albumName: "album name of the song of the artist",
      id: "1234",
      cover: "wow",
    };

    await addToQueue(song1, "anthonyfmb");
    await addToQueue(song2, "anthonyfmb");

    const room1 = await fetchRoomByOwner("anthonyfmb");

    expect(room1.queue[0].name).toBe("song1");

    await moveDownQueue(0, "anthonyfmb");
    const room2 = await fetchRoomByOwner("anthonyfmb");
    expect(room2.queue[0].name).toBe("song2");

    // Testing bounds
    await moveDownQueue(1, "anthonyfmb");
    const room3 = await fetchRoomByOwner("anthonyfmb");
    expect(room3.queue[0].name).toBe("song2");
  });
});
