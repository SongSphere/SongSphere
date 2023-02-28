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
    userName: "",
    givenName: userData.given_name,
    middleName: "",
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

export const updateSpotifyTokens = async (
  email: string,
  token: string,
  refresh_token: string
) => {
  try {
    // call mongoose findOneAndUpdate function with data, this updates database
    const user = await User.findOneAndUpdate(
      { email: email },
      { spotifyToken: token }
    );
    await User.findOneAndUpdate(
      { email: email },
      { spotifyRefreshToken: refresh_token }
    );
  } catch (error) {
    throw error;
  }
};

/*
 *  removeSpotifyToken
 *
 *  Note code structure taken from Tony
 *  This funciton finds the user in the db and updates the spotify token with the one provided
 *
 *  @param email: string  the user email is used to find the user in the database
 *
 *  @param token: string  the users token from the frontend, will be stored in database
 *
 */
export const removeSpotifyTokens = async (email: string) => {
  try {
    // call mongoose findOneAndUpdate function with data, this updates database
    const user = await User.findOneAndUpdate(
      { email: email },
      { spotifyToken: "" },
      { spotifyRefreshToken: "" }
    );
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
    console.log(error);
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

export const fetchUserById = async (
  id: string
): Promise<mongoose.Document<unknown, any, IUser>> => {
  try {
    const user = await User.findById(id);
    return user;
  } catch (error) {
    throw error;
  }
};

export const fetchUserByEmail = async (email: string) => {
  try {
    const user = await User.findOne({ email: email });
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

export const updateNames = async (email: string, username: string, givenName: string, middleName: string, familyName: string) => {
  try {
    await User.findOneAndUpdate(
      { email: email },
      { userName: username }
    );
    await User.findOneAndUpdate(
      { email: email },
      { givenName: givenName }
    );
    await User.findOneAndUpdate(
      { email: email },
      { middleName: middleName }
    );
    await User.findOneAndUpdate(
      { email: email },
      { familyName: familyName }
    );
   
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteUserInServices = async (email: string) => {
  try {
    await User.deleteOne(
      { email: email }
    );

  } catch (error) {
    console.log(error)
    throw error;
  }
};