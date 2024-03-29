import { TMusicContent } from "./music-content";

export type TUser = {
  name: string;
  username: string;
  givenName: string;
  middleName: string;
  familyName: string;
  email: string;
  emailVerified: Boolean;
  profileImgUrl: string;
  backgroundImgUrl: string;
  biography: string;
  token: string;
  spotifyToken: string;
  spotifyTokenEndDate: Date;
  spotifyRefreshToken: string;
  appleToken: string;
  following: string[];
  followers: string[];
  blockedUsers: string[];
  blockedBy: string[];
  onboarded: boolean;
  isPrivate: boolean;
  likes: string[];
  defaultPlatform: string;
  showRandomSong: boolean;
  currentlyPlayingSong: TMusicContent;
  showPlayingSong: boolean;
  partyRoom: string;
};

export type TUserWrapper = {
  user: TUser;
  existingAccount: boolean;
};
