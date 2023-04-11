import { TMusicContent } from "./music-content";

export type TPartyRoom = {
  _id?: string;
  ownerUsername: string;
  ownerEmail: string;
  partyName: string;
  description: string;
  members: string[];
  queue: TMusicContent[];
  musicIndex: number;
};
