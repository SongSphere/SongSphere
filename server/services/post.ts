import mongoose from "mongoose";

import Post, { IPost } from "../db/post";
import { TPost } from "../types/post";

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
      cover: newPost.music.cover,
    },
  });

  return post;
};

export const fetchPostsByUsername = async (username: string) => {
  try {
    const posts = await Post.find({ username: username });
    return posts;
  } catch (error) {
    throw error;
  }
};

export const fetchPostById = async (id: string) => {
  try {
    const post = await Post.findOne({ _id: id });
    return post;
  } catch (error) {
    throw error;
  }
};

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
    await Post.findByIdAndUpdate(newPost._id, {
      username: newPost.username,
      userEmail: newPost.userEmail,
      caption: newPost.caption,
      music: {
        name: newPost.music.name,
        artist: newPost.music.artist,
        albumName: newPost.music.albumName,
        id: newPost.music.id,
        service: newPost.music.service,
        cover: newPost.music.cover,
        category: newPost.music.category,
      },
    });
  } catch (error) {
    throw error;
  }
};

export const removePost = async (post: TPost) => {
  try {
    await Post.findByIdAndDelete(post._id);
  } catch (error) {
    throw error;
  }
};
