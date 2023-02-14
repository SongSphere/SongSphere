import mongoose from "mongoose";

export interface IUser {
  name: string;
  givenName: string;
  familyName: string;
  email: string;
  emailVerified: Boolean;
  profileImgUrl: string;
  token: string; // this is for debugging purposese
}

const UserSchema = new mongoose.Schema<IUser>(
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
  },
  {
    // this enables createdAt and updatedAt
    timestamps: true,
  }
);

const User = mongoose.model<IUser>("User", UserSchema);

export default User;
