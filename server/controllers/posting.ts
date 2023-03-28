// import packages
import { Request, Response, NextFunction } from "express";
import { initScheduledJobs } from "../services/scheduler";
import Seed from "../seed";

// import services
import {
  createPost,
  removePost,
  savePost,
  updatePost,
  fetchPostsByUsername,
  fetchPostById,
} from "../services/post";

export const getSeedForRandomSong = async (req: Request, res: Response) => {

  try {
    // const seed = "https://api.spotify.com/v1/search?type=track&offset=61&limit=1&q=%25s%25";
    const seed = Seed.getSeed();
    console.log(seed);
    res.status(201);
    res.json({ seed: seed });
    return seed;
  } catch(error) {
    console.log("error")
    res.status(500);
    res.json({ error: error });
  }
}

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
