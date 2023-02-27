// import packages
import { TokenPayload } from "google-auth-library";
import mongoose from "mongoose";

// import models
import User, { IUser } from "../db/user";
import { TSong } from "../../client/src/types/song";
import Post, { IPost } from "../db/post";

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

// returns document based on post schema
export const createPost = async (
  username: string,
  userEmail: string,
  caption: string,
  song: TSong
): Promise<mongoose.Document<unknown, any, IPost>> => {
  const post = new Post({
    username: username,
    userEmail: userEmail,
    caption: caption,
    song: {
      name: song.name,
      artist: song.artist,
      albumName: song.albumName,
      id: song.id,
      service: song.service,
    },
  });

  return post;
};

// saves the given post document to the db
export const savePost = async (
  post: mongoose.Document<unknown, any, IPost>
) => {
  try {
    const savedPost = await post.save();
    return savedPost;
  } catch (error) {
    throw error;
  }
};
