import { TUser } from "./user";
export type TPartyRoom = {
    _id?: string;
    ownerUsername: string;
    ownerEmail: string;
    partyName: string;
    description: string;
    members: string[];
    invitedMembers: string[];
  };