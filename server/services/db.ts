// import packages
import { TokenPayload } from "google-auth-library";
import mongoose, { ObjectId } from "mongoose";

// import models
import User, { IUser } from "../db/user";

export const createUser = async (
  userData: TokenPayload,
  token: string
): Promise<mongoose.Document<unknown, any, IUser>> => {
  const user = new User({
    name: userData.name,
    givenName: userData.given_name,
    familyName: userData.family_name,
    email: userData.email,
    emailVerified: userData.email_verified,
    profileImgUrl: userData.picture,
    token: token,
  });
  return user;
};

export const saveUser = async (
  user: mongoose.Document<unknown, any, IUser>
) => {
  try {
    await user.save();
  } catch (error) {
    throw error;
  }
};
