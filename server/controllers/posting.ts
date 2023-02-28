// import packages
import { Request, Response, NextFunction } from "express";

// import services
import { createPost, savePost, saveUser } from "../services/db";

export const storePost = async (req: Request, res: Response) => {
  console.log("in backend controller function");
  console.log("request: " + req.body.toString);

  try {
    const post = await createPost(
      req.body.username,
      req.body.userEmail,
      req.body.caption,
      req.body.music
    );
    await saveUser(post);

    res.status(201);
    res.json({ msg: "success" });
  } catch (error) {
    res.status(500);
    res.json({ error: error });
  }
};
