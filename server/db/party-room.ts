import mongoose,{Schema} from "mongoose";
import User from "./user";

export interface IPartyRoom {
    id: string;
    ownerUsername: string;
    ownerEmail: string;
    partyName: string;
    description: string;
    members: Array<String>;
}

const PartyRoomSchema = new Schema<IPartyRoom> (
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
    },
    {
        timestamps: true,
    }
);

const PartyRoom = mongoose.model<IPartyRoom>("PartyRoom", PartyRoomSchema);
export default PartyRoom;