import { TMusicContent } from "./music-content";
import { TChat } from "./chat";

export type TPartyRoom = {
    _id?: string;
    ownerUsername: string;
    ownerEmail: string;
    partyName: string;
    description: string;
    members: string[];
    invitedMembers: string[];
    queue: TMusicContent[];
    musicIndex: number;
    blocked: string[];
    chats: TChat[];
  };
