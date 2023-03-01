// import packages
import { Request, Response } from "express";

// import services
import { addFollow, getUsersSearch, removeFollow } from "../services/db";

export const follow = async (req: Request, res: Response) => {
  const emailOfUserMakingFollow = req.session.user.email;
  const emailOfUserGettingFollowed = req.body.emailOfUserGettingFollowed;

  try {
    await addFollow(emailOfUserGettingFollowed, emailOfUserMakingFollow);

    res.status(201);
    res.json({ msg: "followed successfully" });
  } catch (error) {
    console.log(error);
    res.json({ error: error });
  }
};

export const unfollow = async (req: Request, res: Response) => {
  const emailOfUserUnfollowing = req.session.user.email;
  const emailOfUserGettingUnfollowed = req.body.emailOfUserGettingUnfollowed;

  try {
    await removeFollow(emailOfUserGettingUnfollowed, emailOfUserUnfollowing);

    res.status(201);
    res.json({ msg: "unfollowed successfully" });
  } catch (error) {
    console.log(error);
    res.json({ error: error });
  }
};

export const getUserTuples = async (req: Request, res: Response) => {
  try {
    const users = await getUsersSearch();

    res.status(201);
    res.json(users);
  } catch (error) {
    console.log(error);
    res.json({ error: error });
  }
};
