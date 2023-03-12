// import packages
import { Request, Response, NextFunction } from "express";

// import services
import {
  createPost,
  removePost,
  savePost,
  updatePost,
  fetchPostsByUsername,
} from "../services/db";

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
