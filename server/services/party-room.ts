import mongoose from "mongoose";

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
    );
  } catch (error) {
    throw error;
  }
};


export const deleteListener = async (id: string, username: string) => {
  try {
    await PartyRoom.findOneAndUpdate(
      { _id: id },
      { $pull: { members: username } }
    );
  } catch (error) {
    throw error;
  }
};

export const addInvitation = async (id: string, username: string) => {
    console.log("Services/server");
    console.log(`${id} and ${username}}`);
    try {
        await PartyRoom.findOneAndUpdate({_id: id}, {$push:{invitedMembers: username}});
    } catch (error) {
        throw error;
    }
};


export const deleteInvitation = async (id: string, username: string) => {
    try {
        await PartyRoom.findOneAndUpdate({_id: id}, {$pull:{invitedMembers: username}});
    } catch (error) {
        throw error;
    }
};

export const transferOwner = async (room: TPartyRoom, username: string) => {
  try {
    await PartyRoom.findOneAndUpdate({_id: room._id}, {
      ownerUsername: username,
    });
    console.log(room);
  } catch (error) {
    throw error;
  }
};
