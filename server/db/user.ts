import mongoose, { Schema } from "mongoose";

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
  token: string; // this is for debugging purposese
  spotifyToken: string;
  spotifyRefreshToken: string;
  appleToken: string;
  following: Array<String>;
  followers: Array<String>;
  onboarded: Boolean;
  isPrivate: Boolean;
  likes: Array<String>;
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
    token: {
      type: String,
      required: true,
    },
    spotifyToken: {
      type: String,
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
    onboarded: {
      type: Boolean,
      required: true,
    },
    isPrivate: {
      type: Boolean,
      required: true,
    },
    likes: {
      type: Array<String>(),
      required: false,
    }
  },
  {
    // this enables createdAt and updatedAt
    timestamps: true,
  }
);

const User = mongoose.model<IUser>("User", UserSchema);
export default User;
