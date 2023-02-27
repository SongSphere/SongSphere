// import packages
import { Request, Response } from "express";

// import services
import { addFollowerToUser, removeFollowerFromUser } from "../services/db";

export const follow = async (req: Request, res: Response) => {
  const email = req.session.user.email;
  const newFollower;

  try {
    await addFollowerToUser(email);

    res.status(201);
    res.json({ msg: "spotify tokens successfully updated" });
  } catch (error) {
    console.log(error);
    res.json({ error: error });
  }
};

export const unfollow = async (req: Request, res: Response) => {
  const email = req.session.user.email;

  try {
    await removeFollowerFromUser(email);

    res.status(201);
    res.json({ msg: "spotify tokens successfully updated" });
  } catch (error) {
    console.log(error);
    res.json({ error: error });
  }
};
