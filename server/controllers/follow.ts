// import packages
import { Request, Response } from "express";

// import services
import {
  addFollow,
  fetchFollowRequests,
  modifyFollowRequest,
  removeFollow,
} from "../services/follow";

export const follow = async (req: Request, res: Response) => {
  // const emailOfUserMakingFollow = req.session.user.email;
  const usernameOfUserMakingFollow = req.body.usernameOfUserMakingFollow;
  const usernameOfUserGettingFollowed = req.body.usernameOfUserGettingFollowed;
  // const emailOfUserGettingFollowed = req.body.emailOfUserGettingFollowed;

  try {
    await addFollow(
      usernameOfUserGettingFollowed,
      usernameOfUserMakingFollow
      // emailOfUserGettingFollowed,
      // emailOfUserMakingFollow
    );

    res.status(201);
    res.json({ msg: "followed successfully" });
  } catch (error) {
    console.error(error);
    res.json({ error: error });
  }
};

export const unfollow = async (req: Request, res: Response) => {
  // const emailOfUserUnfollowing = req.session.user.email;
  const usernameOfUserUnfollowing = req.body.usernameOfUserUnfollowing;
  const usernameOfUserGettingUnfollowed =
    req.body.usernameOfUserGettingUnfollowed;
  // const emailOfUserGettingUnfollowed = req.body.emailOfUserGettingUnfollowed;

  try {
    console.log("unfollow called");
    await removeFollow(
      usernameOfUserGettingUnfollowed,
      usernameOfUserUnfollowing
    );

    res.status(201);
    res.json({ msg: "unfollowed successfully" });
  } catch (error) {
    console.error(error);
    res.json({ error: error });
  }
};

export const getFollowRequests = async (req: Request, res: Response) => {
  try {
    const followRequests = await fetchFollowRequests(req.params.username);
    res.status(201);
    res.json({ followRequests: followRequests });
  } catch (error) {
    res.status(500);
    res.json({ error: error });
  }
};

export const processFollowRequest = async (req: Request, res: Response) => {
  console.log("processing follow request");
  try {
    await modifyFollowRequest(
      req.body.id,
      req.body.action,
      req.body.username,
      req.body.requester
    );
    res.status(201);
    res.json({ mgs: "success" });
  } catch (error) {
    res.status(500);
    res.json({ error: error });
  }
};
