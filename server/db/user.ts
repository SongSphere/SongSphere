import mongoose, { Schema } from "mongoose";
import { TMusicContent } from "../types/music-content";

export interface IUser {
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
  spotifyToken: string;
  spotifyTokenEndDate: Date;
  spotifyRefreshToken: string;
  appleToken: string;
  following: Array<String>;
  followers: Array<String>;
  blockedUsers: Array<String>;
  blockedBy: Array<String>;
  onboarded: Boolean;
  isPrivate: Boolean;
  likes: Array<String>;
  commentLikes: Array<String>;
  defaultPlatform: string;
  showRandomSong: Boolean;
  currentlyPlayingSong: TMusicContent;
  showPlayingSong: Boolean;
  partyRoom: string;
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: false,
    },
    givenName: {
      type: String,
      required: true,
    },
    middleName: {
      type: String,
      required: false,
    },
    familyName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    emailVerified: {
      type: Boolean,
      required: true,
    },
    profileImgUrl: {
      type: String,
      required: true,
    },
    backgroundImgUrl: {
      type: String,
      required: true,
    },
    spotifyToken: {
      type: String,
      required: false,
    },
    spotifyTokenEndDate: {
      type: Date,
      required: false,
    },
    spotifyRefreshToken: {
      type: String,
      required: false,
    },
    appleToken: {
      type: String,
      required: false,
    },
    following: {
      type: Array<String>(),
      required: false,
    },
    followers: {
      type: Array<String>(),
      required: false,
    },
    blockedUsers: {
      type: Array<String>(),
      required: false,
    },
    blockedBy: {
      type: Array<String>(),
      required: false,
    },
    onboarded: {
      type: Boolean,
      required: true,
    },
    isPrivate: {
      type: Boolean,
      required: true,
    },
    showRandomSong: {
      type: Boolean,
      required: false,
    },
    likes: {
      type: Array<String>(),
      required: false,
    },
    commentLikes: {
      type: Array<String>(),
      required: false,
    },
    defaultPlatform: {
      type: String,
      required: false,
    },
    currentlyPlayingSong: {
      type: {
        name: String,
        artist: String,
        albumName: String,
        id: String,
        service: String,
        category: String,
        cover: String,
      },
      required: false,
    },
    showPlayingSong: {
      type: Boolean,
      required: true,
    },
    partyRoom: {
      type: String,
      required: false,
    },
  },
  {
    // this enables createdAt and updatedAt
    timestamps: true,
  }
);

const User = mongoose.model<IUser>("User", UserSchema);
export default User;
