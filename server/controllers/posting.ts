// import packages
import { Request, Response, NextFunction } from "express";
import Seed from "../seed";

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
  fetchSubComments,
  fetchCommentById,
  unlikePost,
  likePost,
  unlikeComment,
  isLiked,
  fetchisLiked,
  likeComment,
} from "../services/post";

export const getSeedForRandomSong = async (req: Request, res: Response) => {
  try {
    const seed = Seed.getSeed();
    console.log(seed);
    res.status(201);
    res.json({ seed: seed });
    return seed;
  } catch (error) {
    console.log("error");
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
    console.log(error);
  }
};

export const getComment = async (req: Request, res: Response) => {
  try {
    let c = await fetchCommentById(req.params.id);
    res.status(201);
    res.json({ comment: c });
  } catch (error) {
    res.status(500);
    console.log(error);
  }
};

export const getComments = async (req: Request, res: Response) => {
  try {
    let c = await fetchComments(req.params.id);
    res.status(201);
    res.json({ comments: c });
  } catch (error) {
    res.status(500);
    console.log(error);
  }
};

export const getSubComments = async (req: Request, res: Response) => {
  try {
    let c = await fetchSubComments(req.params.id);
    res.status(201);
    res.json({ comments: c });
  } catch (error) {
    res.status(500);
    console.log(error);
  }
};

export const updateLikePost = (req: Request, res: Response) => {
  try {
    const email = req.session.user.email;
    likePost(req.body.postId, email);
    res.status(201);
    res.json({ msg: "success" });
  } catch (error) {
    res.status(500);
    res.json({ error: error });
  }
};

export const updateUnlikePost = (req: Request, res: Response) => {
  try {
    const email = req.session.user.email;
    unlikePost(req.body.postId, email);
    res.status(201);
    res.json({ msg: "success" });
  } catch (error) {
    res.status(500);
    res.json({ error: error });
  }
};

export const updateLikeComment = (req: Request, res: Response) => {
  try {
    likeComment(req.body.id);
    res.status(201);
    res.json({ msg: "success" });
  } catch (error) {
    res.status(500);
    res.json({ error: error });
  }
};

export const updateUnlikeComment = (req: Request, res: Response) => {
  try {
    unlikeComment(req.body.id);
    res.status(201);
    res.json({ msg: "success" });
  } catch (error) {
    res.status(500);
    res.json({ error: error });
  }
};

export const fetchIsLiked = async (req: Request, res: Response) => {
  try {
    const email = req.session.user.email;
    const likes = await isLiked(req.params.id, email);
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
