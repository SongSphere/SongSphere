// import packages
import { TokenPayload } from "google-auth-library";
import User, { IUser } from "../db/user";

import mongoose from "mongoose";

export const createUser = async (
  userData: TokenPayload,
  token: string
): Promise<mongoose.Document<unknown, any, IUser>> => {
  const user = new User({
    name: userData.name,
    username: "",
    givenName: userData.given_name,
    middleName: "",
    familyName: userData.family_name,
    email: userData.email,
    emailVerified: userData.email_verified,
    profileImgUrl: userData.picture,
    backgroundImgUrl: userData.picture,
    token: token,
    followers: [],
    following: [],
    onboarded: false,
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

export const removeSpotifyTokens = async (email: string) => {
  try {
    const user = await User.findOne({ email: email });
    user.spotifyToken = undefined;
    user.spotifyRefreshToken = undefined;
    await user.save();
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
    console.error(error);
    throw error;
  }
};

export const removeAppleToken = async (email: string) => {
  try {
    const user = await User.findOne({ email: email });
    user.appleToken = undefined;
    await user.save();
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

export const updateUserOnboarded = async (
  email: string,
  onboarded: boolean
) => {
  try {
    const user = await User.findOneAndUpdate(
      { email: email },
      { onboarded: onboarded },
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

export const fetchUserbyUserName = async (username: string) => {
  try {
    const users = await User.findOne({ username: username });
    return users;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchUsersbyUserName = async (username: string) => {
  var regexp = new RegExp("^" + username);

  try {
    const users = await User.find({ username: regexp });
    return users;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateNames = async (
  email: string,
  username: string,
  givenName: string,
  middleName: string,
  familyName: string
) => {
  try {
    await User.findOneAndUpdate({ email: email }, { username: username });
    await User.findOneAndUpdate({ email: email }, { givenName: givenName });
    await User.findOneAndUpdate({ email: email }, { middleName: middleName });
    await User.findOneAndUpdate({ email: email }, { familyName: familyName });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteUserInServices = async (email: string) => {
  try {
    await User.deleteOne({ email: email });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const addFollow = async (
  usernameOfUserGettingFollowed: string,
  usernameOfUserMakingFollow: string,
  emailOfUserBeingFollowed: string,
  emailOfUserFollowing: string
) => {
  try {
    // add user being followed to following[] of the user doing the following
    await User.updateOne(
      { email: emailOfUserFollowing },
      { $push: { following: usernameOfUserGettingFollowed } }
    );
    // add user doing the following to followers[] of the user being followed
    await User.updateOne(
      { email: emailOfUserBeingFollowed },
      { $push: { followers: usernameOfUserMakingFollow } }
    );
  } catch (error) {
    throw error;
  }
};

export const removeFollow = async (
  usernameOfUserUnfollowing: string,
  usernameOfUserGettingUnfollowed: string,
  emailOfUserBeingUnfollowed: string,
  emailOfUserUnfollowing: string
) => {
  try {
    // remove user being unfollowed from following[] of the user doing the unfollowing
    await User.updateOne(
      { email: emailOfUserUnfollowing },
      { $pull: { following: usernameOfUserGettingUnfollowed } }
    );
    // remove user doing the unfollowing from followers[] of the user being unfollowed
    await User.updateOne(
      { email: emailOfUserBeingUnfollowed },
      { $pull: { followers: usernameOfUserUnfollowing } }
    );
  } catch (error) {
    throw error;
  }
};

export const updatePFP = async (email: string, filename: string) => {
  try {
    await User.findOneAndUpdate(
      { email: email },
      { profileImgUrl: "http://localhost:8080/user/images/" + filename }
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updatePFPUrl = async (email: string, url: string) => {
  try {
    await User.findOneAndUpdate({ email: email }, { profileImgUrl: url });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateBackground = async (email: string, filename: string) => {
  try {
    await User.findOneAndUpdate(
      { email: email },
      { backgroundImgUrl: "http://localhost:8080/user/images/" + filename }
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateBURL = async (email: string, url: string) => {
  try {
    await User.findOneAndUpdate({ email: email }, { backgroundImgUrl: url });
  } catch (error) {
    console.error(error);
    throw error;
  }
};