import { TMusicContent } from "./music-content";

export type TPost = {
  _id?: string;
  username: string;
  userEmail: string;
  caption: string;
  music: TMusicContent;
  comments: string[];
  likes: number;
  repost: boolean;
  taggedUsers: string[];
};
