import mongoose, { Schema } from "mongoose";

export interface IUser {
  name: string;
  givenName: string;
  familyName: string;
  email: string;
  emailVerified: Boolean;
  profileImgUrl: string;
  token: string; // this is for debugging purposese
  spotifyToken: string;
  spotifyRefreshToken: string;
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    givenName: {
      type: String,
      required: true,
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
  },
  {
    // this enables createdAt and updatedAt
    timestamps: true,
  }
);

const User = mongoose.model<IUser>("User", UserSchema);
export default User;
