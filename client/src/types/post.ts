import { TMusicContent } from "./music-content";

export type TPost = {
  id: string;
  username: string;
  userEmail: string;
  caption: string;
  music: TMusicContent;
};
