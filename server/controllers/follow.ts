// import packages
import { Request, Response } from "express";

// import services
import {
  addFollow,
  fetchFollowRequests,
  modifyFollowRequest,
  removeFollow,
  addBlockedAccount,
  unBlockAccount,
} from "../services/follow";

export const follow = async (req: Request, res: Response) => {
  const usernameOfUserMakingFollow = req.body.usernameOfUserMakingFollow;
  const usernameOfUserGettingFollowed = req.body.usernameOfUserGettingFollowed;

  try {
    await addFollow(usernameOfUserGettingFollowed, usernameOfUserMakingFollow);

    res.status(201);
    res.json({ msg: "followed successfully" });
  } catch (error) {
    console.error(error);
    res.json({ error: error });
  }
};

export const unfollow = async (req: Request, res: Response) => {
  const usernameOfUserUnfollowing = req.body.usernameOfUserUnfollowing;
  const usernameOfUserGettingUnfollowed =
    req.body.usernameOfUserGettingUnfollowed;

  try {
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

export const block = async (req: Request, res: Response) => {
  const emailOfUserMakingBlock = req.session.user.email;
  const usernameOfUserMakingBlock = req.body.usernameOfUserMakingBlock;
  const usernameOfUserGettingBlocked = req.body.usernameOfUserGettingBlocked;
  const emailOfUserGettingBlocked = req.body.emailOfUserGettingBlocked;

  try {
    await addBlockedAccount(
      emailOfUserMakingBlock,
      usernameOfUserMakingBlock,
      usernameOfUserGettingBlocked,
      emailOfUserGettingBlocked
    );

    await removeFollow(usernameOfUserMakingBlock, usernameOfUserGettingBlocked);

    await removeFollow(usernameOfUserGettingBlocked, usernameOfUserMakingBlock);

    res.status(201);
    res.json({ msg: "blocked successfully" });
  } catch (error) {
    res.json({ error: error });
  }
};

export const processFollowRequest = async (req: Request, res: Response) => {
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

export const unblock = async (req: Request, res: Response) => {
  const emailOfUserUnblocking = req.session.user.email;
  const usernameOfUserUnblocking = req.body.usernameOfUserUnblocking;
  const usernameOfUserGettingUnblocked =
    req.body.usernameOfUserGettingUnblocked;
  const emailOfUserGettingUnblocked = req.body.emailOfUserGettingUnblocked;

  try {
    await unBlockAccount(
      usernameOfUserUnblocking,
      usernameOfUserGettingUnblocked,
      emailOfUserGettingUnblocked,
      emailOfUserUnblocking
    );

    res.status(201);
    res.json({ msg: "unblocked successfully" });
  } catch (error) {
    console.error(error);
    res.json({ error: error });
  }
};
