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
        members: newRoom.members
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