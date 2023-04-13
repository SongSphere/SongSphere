// set env variable

import User, { IUser } from "../../db/user";
import * as dotenv from "dotenv";
dotenv.config();

// import package
import mongoose from "mongoose";

import createApp from "../../app";

// import db
import { connect } from "../../db/connect";
import { addInvitation, addListener, deleteInvitation, fetchRoomById } from "../../services/party-room";
import PartyRoom from "../../db/party-room";
import Post from "../../db/post";
import Comment from "../../db/comment";
import FollowRequest from "../../db/follow-request";

// This creates a new backend in the database
const app = createApp("testPartyService");

describe("Testing db services", () => {

    beforeAll(async () => {
        await connect("testPartyService");
    });

    afterEach(async () => {
        await User.deleteMany();
        await PartyRoom.deleteMany();
        await Post.deleteMany();
        await Comment.deleteMany();
        await FollowRequest.deleteMany();
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    test("Testing invite users for party", async () => {
        const userA = new User({
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
          await userB.save();
    
          await newRoom.save();
          

          await addInvitation(newRoom._id.toString(), userB.username);
          
          
          const changedRoom = await PartyRoom.findOne({ _id: newRoom._id.toString() });

          expect(changedRoom.invitedMembers).toContain(userB.username);
    });



    test("Testing uninvite users for party", async () => {
        const userA = new User({
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

          const newRoom = new PartyRoom({
            ownerUsername: userA.username,
            ownerEmail: userA.email,
            partyName: "Test Room Party",
            description: "Test Room",
            members: [],
            invitedMembers: ["magician3124"],
            queue: [],
            musicIndex: 0,
          });

          await userA.save();
          await userB.save();
    
          await newRoom.save();
          

          await deleteInvitation(newRoom._id.toString(), userB.username);
          
          const changedRoom = await PartyRoom.findOne({ _id: newRoom._id.toString() });


          expect(changedRoom.invitedMembers).not.toContain(userB.username);
    });


    test("Testing join for party", async () => {
      const userA = new User({
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

        const roomWithUser = new PartyRoom({
          ownerUsername: userA.username,
          ownerEmail: userA.email,
          partyName: "Test Room Party",
          description: "Test Room",
          members: ["magician3124"],
          invitedMembers: [],
          queue: [],
          musicIndex: 0,
        });

        

        await userA.save();
        await userB.save();
  
        await newRoom.save();
        

        await addListener(newRoom._id.toString(), userB.username);

       
        const changedRoom = await PartyRoom.findOne({ _id: newRoom._id.toString() });

        expect(changedRoom.members[0]).toContain(roomWithUser.members[0]);
  });
});