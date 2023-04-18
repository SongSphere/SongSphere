import { TMusicContent } from "./music-content";

export type TPost = {
  _id?: string;
  username: string;
  userEmail: string;
  caption: string;
  music: TMusicContent;
  comments: Array<string>;
  likes: number;
  repost: boolean;
  taggedUsers: Array<string>;
};
