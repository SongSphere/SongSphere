// import packages
import { Request, Response } from "express";

// import services
import { addFollow, removeFollow } from "../services/db";

export const follow = async (req: Request, res: Response) => {
  const emailOfUserMakingFollow = req.session.user.email;
  const usernameOfUserMakingFollow = req.body.usernameOfUserMakingFollow;
  const usernameOfUserGettingFollowed = req.body.usernameOfUserGettingFollowed;
  const emailOfUserGettingFollowed = req.body.emailOfUserGettingFollowed;

  try {
    await addFollow(
      usernameOfUserGettingFollowed,
      usernameOfUserMakingFollow,
      emailOfUserGettingFollowed,
      emailOfUserMakingFollow
    );

    res.status(201);
    res.json({ msg: "followed successfully" });
  } catch (error) {
    console.error(error);
    res.json({ error: error });
  }
};

export const unfollow = async (req: Request, res: Response) => {
  const emailOfUserUnfollowing = req.session.user.email;
  const usernameOfUserUnfollowing = req.body.usernameOfUserUnfollowing;
  const usernameOfUserGettingUnfollowed =
    req.body.usernameOfUserGettingUnfollowed;
  const emailOfUserGettingUnfollowed = req.body.emailOfUserGettingUnfollowed;

  try {
    await removeFollow(
      usernameOfUserUnfollowing,
      usernameOfUserGettingUnfollowed,
      emailOfUserGettingUnfollowed,
      emailOfUserUnfollowing
    );

    res.status(201);
    res.json({ msg: "unfollowed successfully" });
  } catch (error) {
    console.error(error);
    res.json({ error: error });
  }
};
