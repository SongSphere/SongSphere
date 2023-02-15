// import packages
import { TokenPayload } from "google-auth-library";
import mongoose from "mongoose";

// import models
import { IUser } from "../db/user";

export const createUser = async (
  userData: TokenPayload,
  token: string,
  User: mongoose.Model<IUser, {}, {}, {}, any>
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

export const checkUser = async (email: string, User: mongoose.Model<IUser>) => {
  try {
    const exist = await User.exists({ email: email });
    return exist;
  } catch (error) {
    throw error;
  }
};

export const fetchUser = async (
  id: string,
  User: mongoose.Model<IUser>
): Promise<mongoose.Document<unknown, any, IUser>> => {
  try {
    const user = await User.findById(id);
    return user;
  } catch (error) {
    throw error;
  }
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
