// import packages
import axios from "axios";
import { Request, Response, NextFunction } from "express";
import qs from "qs";
import Seed from "../seed";

const SPOTIFY_API = "https://api.spotify.com/v1";

// import services
import {
  createPost,
  removePost,
  savePost,
  updatePost,
  fetchPostsByUsername,
  fetchPostById,
  comment,
  saveComment,
  fetchComments,
  notificationForAlerts,
  saveNotification,
  fetchNotificationByEmailAddress,
  fetchSubComments,
  fetchCommentById,
  unlikePost,
  likePost,
  unlikeComment,
  postIsLiked,
  commentIsLiked,
  fetchisLiked,
  likeComment,
  fetchPostLikes,
  fetchCommentLikes,
} from "../services/post";

export const getSeedForRandomSong = async (req: Request, res: Response) => {
  try {
    const seed = Seed.getSeed();
    res.status(201);
    res.json({ seed: seed });
    return seed;
  } catch (error) {
    res.status(500);
    res.json({ error: error });
  }
};

export const getPostsByUsername = async (req: Request, res: Response) => {
  try {
    const posts = await fetchPostsByUsername(req.params.username);

    res.status(201);
    res.json({ posts: posts });
  } catch (error) {
    res.status(500);
    res.json({ error: error });
  }
};

export const getNotificationsByEmail = async (req: Request, res: Response) => {
  try {
    const notifications = await fetchNotificationByEmailAddress(
      req.params.userEmailReceiver
    );

    res.status(201);
    res.json({ notifications: notifications });
  } catch (error) {
    res.status(500);
    res.json({ error: error });
  }
};

export const getPostById = async (req: Request, res: Response) => {
  try {
    const post = await fetchPostById(req.params.id);
    res.status(201);
    res.json({ post: post });
  } catch (error) {
    res.status(500);
    res.json({ error: error });
  }
};

export const storePost = async (req: Request, res: Response) => {
  try {
    const post = await createPost(req.body.post);
    await savePost(post);

    res.status(201);
    res.json({ msg: "success" });
  } catch (error) {
    console.error(error);
    res.status(500);
    res.json({ error: error });
  }
};

export const editPost = async (req: Request, res: Response) => {
  try {
    await updatePost(req.body.post);

    res.status(201);
    res.json({ msg: "success" });
  } catch (error) {
    res.status(500);
    res.json({ error: error });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    await removePost(req.body.post);

    res.status(201);
    res.json({ msg: "success" });
  } catch (error) {
    res.status(500);
    res.json({ error: error });
  }
};

export const sendNotification = async (req: Request, res: Response) => {
  try {
    const newNotification = await notificationForAlerts(
      req.body.notificationForAlerts
    );
    await saveNotification(newNotification);
    res.status(201);
    res.json({ msg: "success" });
  } catch (error) {
    res.status(500);
    res.json({ error: error });
  }
};

export const sendComment = async (req: Request, res: Response) => {
  try {
    const c = await comment(
      req.body.comment,
      req.body.postId,
      req.body.replyingTo
    );
    await saveComment(c);
    res.status(201);
    res.json({ msg: "success" });
  } catch (error) {
    res.status(500);
    console.error(error);
  }
};

export const getComment = async (req: Request, res: Response) => {
  try {
    let c = await fetchCommentById(req.params.id);
    res.status(201);
    res.json({ comment: c });
  } catch (error) {
    res.status(500);
    console.error(error);
  }
};

export const getComments = async (req: Request, res: Response) => {
  try {
    let c = await fetchComments(req.params.id);
    res.status(201);
    res.json({ comments: c });
  } catch (error) {
    res.status(500);
    console.error(error);
  }
};

export const getSubComments = async (req: Request, res: Response) => {
  try {
    let c = await fetchSubComments(req.params.id);
    res.status(201);
    res.json({ comments: c });
  } catch (error) {
    res.status(500);
    console.error(error);
  }
};

export const updateLikePost = async (req: Request, res: Response) => {
  try {
    const email = req.session.user.email;
    await likePost(req.body.id, email);
    res.status(201);
    res.json({ msg: "success" });
  } catch (error) {
    res.status(500);
    res.json({ error: error });
  }
};

export const updateUnlikePost = async (req: Request, res: Response) => {
  try {
    const email = req.session.user.email;
    await unlikePost(req.body.id, email);
    res.status(201);
    res.json({ msg: "success" });
  } catch (error) {
    res.status(500);
    res.json({ error: error });
  }
};

export const updateLikeComment = async (req: Request, res: Response) => {
  try {
    await likeComment(req.body.id, req.session.user.email);
    res.status(201);
    res.json({ msg: "success" });
  } catch (error) {
    res.status(500);
    res.json({ error: error });
  }
};

export const updateUnlikeComment = async (req: Request, res: Response) => {
  try {
    await unlikeComment(req.body.id, req.session.user.email);
    res.status(201);
    res.json({ msg: "success" });
  } catch (error) {
    res.status(500);
    res.json({ error: error });
  }
};

export const getPostLiked = async (req: Request, res: Response) => {
  try {
    const email = req.session.user.email;
    const liked = await postIsLiked(req.params.id, email);
    res.status(201);
    res.json({ liked: liked });
  } catch (error) {
    res.status(500);
    res.json({ error: error });
  }
};

export const getCommentLiked = async (req: Request, res: Response) => {
  try {
    const email = req.session.user.email;
    const liked = await commentIsLiked(req.params.id, email);
    res.status(201);
    res.json({ liked: liked });
  } catch (error) {
    res.status(500);
    res.json({ error: error });
  }
};

export const getPostLikes = async (req: Request, res: Response) => {
  try {
    const likes = await fetchPostLikes(req.params.id);
    res.status(201);
    res.json({ likes: likes });
  } catch (error) {
    res.status(500);
    res.json({ error: error });
  }
};

export const getCommentLikes = async (req: Request, res: Response) => {
  try {
    const likes = await fetchCommentLikes(req.params.id);
    res.status(201);
    res.json({ likes: likes });
  } catch (error) {
    res.status(500);
    res.json({ error: error });
  }
};

export const fetchLikedPosts = async (req: Request, res: Response) => {
  try {
    const likes = await fetchisLiked(req.params.username);
    res.status(200);
    res.json({ likes: likes });
  } catch (error) {
    res.status(500);
    res.json({ error: error });
  }
};

export const addToSpotifyLibrary = async (req: Request, res: Response) => {
  try {
    let addreq = await axios.put(
      `${SPOTIFY_API}/me/tracks?ids=${req.body.id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${req.body.token}`,
        },
      }
    );

    if (addreq.status != 200) {
      throw new Error("add song failed");
    }

    res.status(201);
    res.json({ msg: "success" });
  } catch (error) {
    res.status(500);
    res.json({ msg: error });
  }
};
