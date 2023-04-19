import { TMusicContent } from "./music-content";
import { TChat } from "./chat";

export type TPartyRoom = {
    _id?: string;
    ownerUsername: string;
    ownerEmail: string;
    partyName: string;
    description: string;
    members: Array<String>;
    invitedMembers: Array<String>;
    queue: Array<TMusicContent>;
    musicIndex: number;
    blocked: Array<String>;
    chats: Array<TChat>
};
