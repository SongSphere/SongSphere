import mongoose, { Schema } from "mongoose";
import { TMusicContent } from "../types/music-content";
import User from "./user";

export interface IPartyRoom {
  id: string;
  ownerUsername: string;
  ownerEmail: string;
  partyName: string;
  description: string;
  members: Array<String>;
  invitedMembers: Array<String>;
  queue: Array<TMusicContent>;
  musicIndex: Number;
}

const PartyRoomSchema = new Schema<IPartyRoom>(
  {
    id: {
      type: String,
      required: false,
    },
    ownerUsername: {
      type: String,
      required: true,
    },
    ownerEmail: {
      type: String,
      required: true,
    },
    partyName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    members: {
      type: Array<String>(),
      required: true,
    },
    invitedMembers: {
      type: Array<String>(),
      required: true,
    },
    queue: {
      type: Array<TMusicContent>(),
      required: true,
    },
    musicIndex: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const PartyRoom = mongoose.model<IPartyRoom>("PartyRoom", PartyRoomSchema);
export default PartyRoom;
