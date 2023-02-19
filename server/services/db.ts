// import packages
import { TokenPayload } from "google-auth-library";
import mongoose from "mongoose";

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

export const checkUser = async (email: string) => {
  try {
    const exist = await User.exists({ email: email });
    return exist;
  } catch (error) {
    throw error;
  }
};

export const updateAppleToken = async (email: string, token: string) => {
  try {
    const user = await User.findOneAndUpdate(
      { email: email },
      { appleToken: token }
    );
  } catch (error) {
    throw error;
  }
};

export const removeAppleToken = async (email: string) => {
  try {
    const user = await User.findOneAndUpdate(
      { email: email },
      { appleToken: "" }
    );
  } catch (error) {
    throw error;
  }
};

export const updateUserToken = async (email: string, token: string) => {
  try {
    const user = await User.findOneAndUpdate(
      { email: email },
      { token: token },
      { new: true }
    );
    return user;
  } catch (error) {
    throw error;
  }
};

export const fetchUser = async (
  id: string
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
    const savedUser = await user.save();
    return savedUser;
  } catch (error) {
    throw error;
  }
};
