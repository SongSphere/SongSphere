import mongoose from "mongoose";

import Post, { IPost } from "../db/post";
import { TPost } from "../types/post";
import { TComment } from "../types/comment";
import Comment, { IComment } from "../db/comment";
import User from "../db/user";

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
    repost: newPost.repost,
    likes: newPost.likes,
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

// Add replying to posibility.
export const comment = async (
  newComment: TComment,
  postId: string,
  replyingTo: string
): Promise<mongoose.Document<unknown, any, IComment>> => {
  const comment = new Comment({
    username: newComment.username,
    userEmail: newComment.userEmail,
    text: newComment.text,
    subComments: newComment.subComments,
  });

  let post = await Post.findOne({ _id: postId }, "comments");
  let comments = post.comments;
  comments.push(comment._id.toString());

  await Post.findByIdAndUpdate(postId, { comments: comments });

  if (replyingTo.length != 0) {
    let c = await Comment.findOne({ _id: replyingTo }, "subComments");
    let subC = c.subComments;
    subC.push(comment._id.toString());
    await Comment.findByIdAndUpdate(replyingTo, { subComments: subC });
  }

  return comment;
};

export const saveComment = async (
  comment: mongoose.Document<unknown, any, IComment>
) => {
  try {
    await comment.save();
  } catch (error) {
    throw error;
  }
};

export const likePost = async (postId: string, email: string) => {
  try {
    await User.updateOne({ email: email }, { $push: { likes: postId } });
    await Post.findOneAndUpdate({ _id: postId }, { $inc: { likes: 1 } });
    console.log("here");
  } catch (error) {
    throw error;
  }
};

export const unlikePost = async (postId: string, email: string) => {
  try {
    await User.updateOne({ email: email }, { $pull: { likes: postId } });
    await Post.findOneAndUpdate({ _id: postId }, { $inc: { likes: -1 } });
  } catch (error) {
    throw error;
  }
};

export const isLiked = async (postId: string, email: string) => {
  try {
    const user = await User.findOne({ email: email });
    const isLiked = user.likes.includes(postId);
    return isLiked;
  } catch (error) {
    throw error;
  }
};

export const fetchisLiked = async (username: string) => {
  try {
    let posts: (mongoose.Document<unknown, any, IPost> &
      IPost & {
        _id: mongoose.Types.ObjectId;
      })[] = [];
    const users = await User.findOne({ username: username });
    const likes = users.likes;
    for (let i = 0; i < likes.length; i++) {
      let userPosts = await Post.find({ _id: likes[i] });
      posts.push(...userPosts);
    }

    return posts;
  } catch (error) {
    throw error;
  }
};
