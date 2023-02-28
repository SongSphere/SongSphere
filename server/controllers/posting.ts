// import packages
import { Request, Response, NextFunction } from "express";

// import services
import { createPost, removePost, savePost, updatePost } from "../services/db";

export const storePost = async (req: Request, res: Response) => {
  try {
    const post = await createPost(req.body.post);
    await savePost(post);

    res.status(201);
    res.json({ msg: "success" });
  } catch (error) {
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
