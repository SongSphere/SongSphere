import mongoose from "mongoose";
import { TMusicContent } from "../types/music-content";

import PartyRoom, { IPartyRoom } from "../db/party-room";
import { TPartyRoom } from "../types/party-room";

export const createPartyRoom = async (
  newRoom: TPartyRoom
): Promise<mongoose.Document<unknown, any, IPartyRoom>> => {
  const party = new PartyRoom({
    ownerUsername: newRoom.ownerUsername,
    ownerEmail: newRoom.ownerEmail,
    description: newRoom.description,
    partyName: newRoom.partyName,
    members: newRoom.members,
    invitedMembers: newRoom.invitedMembers,
    queue: newRoom.queue,
    musicIndex: newRoom.musicIndex,
  });
  await User.findOneAndUpdate({username: newRoom.ownerUsername}, {partyRoom: party._id.toString()});
  return party;
};

export const saveRoom = async (
  room: mongoose.Document<unknown, any, IPartyRoom>
) => {
  try {
    const savedRoom = await room.save();
    return savedRoom;
  } catch (error) {
    throw error;
  }
};

export const fetchRoomByOwner = async (username: string) => {
  try {
    const room = await PartyRoom.findOne({ ownerUsername: username });
    return room;
  } catch (error) {
    throw error;
  }
};

export const fetchRoomById = async (id: string) => {
  try {
    const room = await PartyRoom.findOne({ _id: id });
    return room;
  } catch (error) {
    throw error;
  }
};

export const deleteRoom = async (room: TPartyRoom) => {
  try {
    await PartyRoom.findByIdAndDelete(room._id);
  } catch (error) {
    throw error;
  }
};

export const addListener = async (room: TPartyRoom, username: string) => {
  try {
    await PartyRoom.findOneAndUpdate(
      { _id: room._id },
      { $push: { members: username } }
    ).then(async () => {
      await User.findOneAndUpdate(
        {username: username}, 
        {partyRoom: room._id.toString()}
      )
    });
  } catch (error) {
    throw error;
  }
};

export const deleteListener = async (id: string, username: string) => {
  try {
    await PartyRoom.findOneAndUpdate(
      { _id: id },
      { $pull: { members: username } }
    ).then(async () => {
      await User.findOneAndUpdate(
        {username: username}, 
        {partyRoom: ""}
      )
    })
  } catch (error) {
    throw error;
  }
};

export const addInvitation = async (id: string, username: string) => {
  try {
    await PartyRoom.findOneAndUpdate(
      { _id: id },
      { $push: { invitedMembers: username } }
    );
  } catch (error) {
    throw error;
  }
};

export const addToQueue = async (song: TMusicContent, username: string) => {
  try {
    const room = await PartyRoom.findOne({
      members: {
        $in: [username],
      },
    });
    await PartyRoom.findOneAndUpdate(
      { _id: room._id },
      { $push: { queue: song } }
    );
  } catch (error) {
    throw error;
  }
};

export const removeFromQueue = async (index: number, username: string) => {
  try {
    const room = await PartyRoom.findOne({
      members: {
        $in: [username],
      },
    });
    room.queue.splice(index, 1);
    room.save();
  } catch (error) {
    throw error;
  }
};

export const moveUpQueue = async (index: number, username: string) => {
  try {
    const room = await PartyRoom.findOne({
      members: {
        $in: [username],
      },
    });
    if (index == 0) return;
    const temp = room.queue[index - 1];
    room.queue[index - 1] = room.queue[index];
    room.queue[index] = temp;

    room.save();
  } catch (error) {
    throw error;
  }
};

export const moveDownQueue = async (index: number, username: string) => {
  try {
    const room = await PartyRoom.findOne({
      members: {
        $in: [username],
      },
    });
    if (index == room.queue.length - 1) return;
    const temp = room.queue[index + 1];
    room.queue[index + 1] = room.queue[index];
    room.queue[index] = temp;

    room.save();
  } catch (error) {
    throw error;
  }
};

export const deleteInvitation = async (id: string, username: string) => {
  console.log(`${id} ${username}}`);
  try {
    await PartyRoom.findOneAndUpdate(
      { _id: id },
      { $pull: { invitedMembers: username } }
    );
  } catch (error) {
    throw error;
  }
};

export const transferOwner = async (room: TPartyRoom, username: string) => {
  try {
    await PartyRoom.findOneAndUpdate(
      { _id: room._id },
      {
        ownerUsername: username,
      }
    );
  } catch (error) {
    throw error;
  }
};

export const blockUser = async (room: TPartyRoom, username: string) => {
  try {
    await PartyRoom.findOneAndUpdate(
      { _id: room._id },
      {
        $push: { blocked: username } 
      }
    );
  } catch (error) {
    throw error
  }
}

// Require
var postmark = require("postmark");

// const nodemailer = require('nodemailer');
// export const sendInvitationEmail = async () => {
//   // Example request
//   var client = new postmark.ServerClient(
//     "ace1f28f-730e-465c-9a53-1a53f73177ba"
//   );

//   client.sendEmail({
//     From: "khkim@purdue.edu",
//     To: "khkim@purdue.edu",
//     Subject: "Test",
//     TextBody: "Hello from Postmark!",
//   });
// };

import { CourierClient } from "@trycourier/courier";
import User from "../db/user";
export const sendInvitationEmail = async (
  roomId: string,
  senderUsername: string,
  receiverEmail: string
) => {
  console.log("sendInvitationEmail in server/services");
  console.log(roomId, senderUsername, receiverEmail);

  const courier = CourierClient({
    authorizationToken: "pk_prod_YMG62BBWAWMTNQPR5E9ZK64RTJSS",
  });

  const { requestId } = await courier.send({
    message: {
      content: {
        title: `${senderUsername} Invited you to a party!`,
        body: "Here is the party Link? {{joke}}",
      },
      data: {
        joke: `http://localhost:3000/party/${roomId}`,
      },
      to: {
        email: `${receiverEmail}`,
      },
    },
  });
};
