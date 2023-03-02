// import packages
import { TokenPayload } from "google-auth-library";
import mongoose from "mongoose";

// import models
import User, { IUser } from "../db/user";
import { TMusicContent } from "../../client/src/types/music-content";
import { TPost } from "../../client/src/types/post";
import Post, { IPost } from "../db/post";
import fs from "fs";

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
    followers: {},
    following: {},
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
  newPost: TPost
): Promise<mongoose.Document<unknown, any, IPost>> => {
  const post = new Post({
    username: newPost.username,
    userEmail: newPost.userEmail,
    caption: newPost.caption,
    music: {
      name: newPost.music.name,
      artist: newPost.music.artist,
      albumName: newPost.music.albumName,
      id: newPost.music.id,
      service: newPost.music.service,
      category: newPost.music.category,
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

export const updatePost = async (newPost: TPost) => {
  try {
    // call mongoose updateOne function with data, this updates database
    await Post.findByIdAndUpdate(newPost.id, {
      username: newPost.username,
      userEmail: newPost.userEmail,
      caption: newPost.caption,
      music: {
        name: newPost.music.name,
        artist: newPost.music.artist,
        albumName: newPost.music.albumName,
        id: newPost.music.id,
        service: newPost.music.service,
        category: newPost.music.category,
      },
    });
  } catch (error) {
    throw error;
  }
};

export const removePost = async (post: TPost) => {
  try {
    await Post.findByIdAndDelete(post.id);
  } catch (error) {
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
    await User.findOneAndUpdate({ email: email }, { userName: username });
    await User.findOneAndUpdate({ email: email }, { givenName: givenName });
    await User.findOneAndUpdate({ email: email }, { middleName: middleName });
    await User.findOneAndUpdate({ email: email }, { familyName: familyName });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteUserInServices = async (email: string) => {
  try {
    await User.deleteOne({ email: email });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const addFollow = async (
  emailOfUserBeingFollowed: string,
  emailOfUserFollowing: string
) => {
  try {
    // add user being followed to following[] of the user doing the following
    await User.updateOne(
      { email: emailOfUserFollowing },
      { $push: { following: emailOfUserBeingFollowed } }
    );
    // add user doing the following to followers[] of the user being followed
    await User.updateOne(
      { email: emailOfUserBeingFollowed },
      { $push: { followers: emailOfUserFollowing } }
    );
  } catch (error) {
    throw error;
  }
};

export const removeFollow = async (
  emailOfUserBeingUnfollowed: string,
  emailOfUserUnfollowing: string
) => {
  try {
    // remove user being unfollowed from following[] of the user doing the unfollowing
    await User.updateOne(
      { email: emailOfUserUnfollowing },
      { $pull: { following: emailOfUserBeingUnfollowed } }
    );
    // remove user doing the unfollowing from followers[] of the user being unfollowed
    await User.updateOne(
      { email: emailOfUserBeingUnfollowed },
      { $pull: { followers: emailOfUserUnfollowing } }
    );
  } catch (error) {
    throw error;
  }
};

export const updatePFP = async (email: string, arrayBufferStr: string) => {
  try {
    //const file = new File([blob], "Cropped image");
    // var arrayBuffer;
    // var fileReader = new FileReader();
    // fileReader.onload = function (event: { target: { result: any } }) {
    //   arrayBuffer = event.target.result;
    // };
    // fileReader.readAsArrayBuffer(blob);
    //const arrayBuffer = await blob.arrayBuffer();
    // const arrayBuffer = await blob["arrayBuffer"]();
    //const arrayBuffer = await new Response(blob).arrayBuffer();

    // var buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
    // var bufView = new Uint16Array(buf);
    // for (var i = 0, strLen = str.length; i < strLen; i++) {
    //   bufView[i] = str.charCodeAt(i);
    // }

    var enc = new TextEncoder(); // always utf-8
    const arrayBuffer = enc.encode(arrayBufferStr).buffer;

    // const stringLength = arrayBufferStr.length;
    // const arrayBuffer = new ArrayBuffer(stringLength * 2);
    // const bufferView = new Uint16Array(arrayBuffer);
    // for (let i = 0; i < stringLength; i++) {
    //   bufferView[i] = arrayBufferStr.charCodeAt(i);
    // }
    //return buffer;

    // console.log("THIS IS ARRAYBUFFER");
    // //console.log(arrayBuffer);
    // const buffer = Buffer.from(arrayBuffer);

    // //const fileBuffer = Buffer.from(file);
    // await fs.writeFile("./saturn.png", buffer, (err) => {
    //   if (err) console.log(err);
    //   else {
    //     console.log("File written successfully\n");
    //     console.log("The written has the following contents:");
    //     //console.log(fs.readFileSync("books.txt", "utf8"));
    //   }
    // });
    // const link = document.createElement("a");
    // const url = URL.createObjectURL(file);
    // link.href = url;
    // link.download = file.name;
    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);
    // window.URL.revokeObjectURL(url);
    // console.log("hello?");
    //fs.writeFileSync("name", buffer);
    //await User.findOneAndUpdate({ email: email }, { })
  } catch (error) {
    console.log(error);
    throw error;
  }
};
