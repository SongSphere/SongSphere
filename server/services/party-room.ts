import mongoose from "mongoose";
import { TMusicContent } from "../types/music-content";

import PartyRoom, { IPartyRoom } from "../db/party-room";
import { TPartyRoom } from "../types/party-room";
import { TChat } from "../types/chat";

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
  await User.findOneAndUpdate(
    { username: newRoom.ownerUsername },
    { partyRoom: party._id }
  );

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
    if (!room) {
      throw Error;
    }

    return room;
  } catch (error) {
    throw error;
  }
};

export const deleteRoom = async (room: TPartyRoom) => {
  try {
    await PartyRoom.findByIdAndDelete(room._id);
    await User.findOneAndUpdate(
      { username: room.ownerUsername },
      { partyRoom: "" }
    );
  } catch (error) {
    throw error;
  }
};

export const addListener = async (roomId: string, username: string) => {
  try {
    const foundParty = await PartyRoom.findOne({ _id: roomId });
    if (
      !foundParty.members.includes(username)
      // foundParty.invitedMembers.includes(username)
    ) {
      let room = await PartyRoom.findOneAndUpdate(
        { _id: roomId },
        { $push: { members: username } }
      );
      room.save();
    }

    await User.findOneAndUpdate({ username: username }, { partyRoom: roomId });
  } catch (error) {
    throw error;
  }
};

export const deleteListener = async (room: TPartyRoom, username: string) => {
  try {
    await PartyRoom.findOneAndUpdate(
      { _id: room._id },
      { $pull: { members: username } }
    ).then(async () => {
      await User.findOneAndUpdate({ username: username }, { partyRoom: "" });
    });
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

export const getQueue = async (username: string) => {
  try {
    const room = await PartyRoom.findOne({
      members: {
        $in: [username],
      },
    });
    return room.queue;
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
    await room.save();
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

    await room.save();
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

    await room.save();
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
        $push: { blocked: username },
      }
    ).then(async () => {
      await User.findOneAndUpdate({ username: username }, { partyRoom: "" });
    });
  } catch (error) {
    throw error;
  }
};

export const updatePartyRoom = async (username: string, update: string) => {
  try {
    await User.findOneAndUpdate({ username: username }, { partyRoom: update });
  } catch (error) {
    throw error;
  }
};

export const sendChat = async (room: TPartyRoom, chat: TChat) => {
  try {
    await PartyRoom.findOneAndUpdate(
      { _id: room._id },
      {
        $push: { chats: chat },
      }
    );
  } catch (error) {
    throw error;
  }
};

export const fetchChats = async (id: string) => {
  try {
    const room = await PartyRoom.findOne({ _id: id });
    return room;
  } catch (error) {
    throw error;
  }
};

import { CourierClient } from "@trycourier/courier";
import User from "../db/user";
export const sendInvitationEmail = async (
  roomId: string,
  senderUsername: string,
  receiverEmail: string
) => {
  const courier = CourierClient({
    authorizationToken: process.env.EMAIL_API_KEY,
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

export const updateIndex = async (index: number, username: string) => {
  try {
    const room = await PartyRoom.findOne({
      members: {
        $in: [username],
      },
    });
    await PartyRoom.findOneAndUpdate({ _id: room._id }, { musicIndex: index });
  } catch (error) {
    throw error;
  }
};
