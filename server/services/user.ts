// import packages
import { TokenPayload } from "google-auth-library";
import User, { IUser } from "../db/user";
import Post, { IPost } from "../db/post";
import PartyRoom from "../db/party-room";

import mongoose from "mongoose";
import { TMusicContent } from "../types/music-content";

export const createUser = async (
  userData: TokenPayload
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
    biography: "",
    followers: [],
    following: [],
    onboarded: false,
    isPrivate: false,
    likes: [],
    showRandomSong: false,
    currentlyPlayingSong: null,
    showPlayingSong: false,
    commentLikes: [],
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
  token_expires: Date,
  refresh_token: string
) => {
  try {
    // call mongoose findOneAndUpdate function with data, this updates database
    const user = await User.findOne({ email: email });
    user.spotifyToken = token;
    user.spotifyTokenEndDate = token_expires;
    user.spotifyRefreshToken = refresh_token;
    await user.save();
  } catch (error) {
    throw error;
  }
};

export const removeSpotifyTokens = async (email: string) => {
  try {
    const user = await User.findOne({ email: email });
    user.spotifyToken = undefined;
    user.spotifyRefreshToken = undefined;
    user.spotifyTokenEndDate = undefined;
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

export const updateUserBio = async (username: string, bio: string) => {
  try {
    const user = await User.findOneAndUpdate(
      { username: username },
      { biography: bio },
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

export const updateUserVisibility = async (
  email: string,
  isPrivate: boolean
) => {
  try {
    const user = await User.findOneAndUpdate(
      { email: email },
      { isPrivate: isPrivate },
      { new: true }
    );

    return user;
  } catch (error) {
    throw error;
  }
};

export const updateShowRandomSong = async (
  email: string,
  showRandomSong: boolean
) => {
  try {
    const user = await User.findOneAndUpdate(
      { email: email },
      { showRandomSong: showRandomSong },
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

export const fetchFeed = async (email: string, num: number) => {
  try {
    let posts: (mongoose.Document<unknown, any, IPost> &
      IPost & {
        _id: mongoose.Types.ObjectId;
      })[] = [];

    let user = await User.findOne({ email: email }, "following");
    let following = user.following;

    for (let i = 0; i < following.length; i++) {
      let userPosts = await Post.find({ username: following[i] });
      posts.push(...userPosts);
    }

    posts.sort(function (a, b) {
      return b.get("createdAt") - a.get("createdAt");
    });

    if (num * 20 > posts.length) {
      return [];
    }
    if (num * 20 + 20 > posts.length) {
      return posts.slice(num * 20, posts.length);
    }
    return posts.slice(num * 20, num * 20 + 20);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteUserInServices = async (username: string) => {
  try {
    await User.deleteOne({ username: username });
    await Post.deleteMany({ username: username });
    await PartyRoom.deleteMany({ username: username });
  } catch (error) {
    console.error(error);
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

export const getDefaultPlatform = async (email: string) => {
  try {
    const user = await User.findOne({ email: email }, "defaultPlatform");
    const platform = user.defaultPlatform;

    return platform;
  } catch (error) {
    throw error;
  }
};

export const setDefaultPlatform = async (
  email: string,
  defaultPlatform: string
) => {
  try {
    await User.findOneAndUpdate(
      { email: email },
      { defaultPlatform: defaultPlatform }
    );
  } catch (error) {
    throw error;
  }
};

export const getFriendActivity = async (email: string) => {
  interface IActivity {
    user: IUser;
    song: TMusicContent;
  }

  try {
    let activity: IActivity[] = [];
    const user = await User.findOne({ email: email });
    let following = user.following;
    for (let i = 0; i < following.length; i++) {
      let user = await User.findOne({ username: following[i] });
      if (user.currentlyPlayingSong != null && user.showPlayingSong == true) {
        let song: TMusicContent = user.currentlyPlayingSong;
        const newActivity = {
          user: user,
          song: song,
        };
        activity.push(newActivity);
      }
    }
    return activity;
  } catch (error) {
    throw error;
  }
};

export const setPlayingSong = async (
  email: string,
  song: TMusicContent | null
) => {
  try {
    await User.findOneAndUpdate(
      { email: email },
      { currentlyPlayingSong: song }
    );
  } catch (error) {
    throw error;
  }
};

export const setShowSong = async (email: string, set: boolean) => {
  try {
    const user = await User.findOneAndUpdate(
      { email: email },
      { showPlayingSong: set },
      { new: true }
    );
    return user;
  } catch (error) {
    throw error;
  }
};

export const getAnalytics = async (email: string) => {
  try {
    // index 0 -> total likes
    // index 1 -> average likes
    // index 2 -> total comments
    // index 3 -> average comments
    const analytics: number[] = [];
    const posts = await Post.find({ userEmail: email });
    const totalPosts = posts.length;

    if (totalPosts == 0) {
      for (let i = 0; i < 4; i++) {
        analytics[i] = 0;
      }
      return analytics;
    }

    let totalLikes = 0;
    let totalComments = 0;

    for (let i = 0; i < posts.length; i++) {
      totalLikes += posts[i].likes;
      totalComments += posts[i].comments.length;
    }

    analytics[0] = totalLikes;
    analytics[1] = Number((totalLikes / totalPosts).toFixed(2));
    analytics[2] = totalComments;
    analytics[3] = Number((totalComments / totalPosts).toFixed(2));
    return analytics;
  } catch (error) {
    throw error;
  }
};
