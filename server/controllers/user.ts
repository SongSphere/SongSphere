import { Request, Response, NextFunction } from "express";
import {
  deleteUserInServices,
  fetchUserByEmail,
  fetchUserbyUserName,
  fetchUsersbyUserName,
  removeAppleToken,
  removeSpotifyTokens,
  updateNames,
  updatePFP,
  updateUserOnboarded,
  updateBackground,
  updatePFPUrl,
  updateBURL,
  fetchFeed,
  updateUserVisibility,
  getDefaultPlatform,
  setDefaultPlatform,
  updateShowRandomSong,
  getFriendActivity,
  setPlayingSong,
  setShowSong,
  updateUserBio,
  getAnalytics,
} from "../services/user";

import fs from "fs";

export const sessionUpdate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await fetchUserByEmail(req.session.user.email);
    res.status(200);
    res.json({ user: user });
  } catch (error) {
    res.status(404);
    res.json({ msg: "cannot find user" });
  }
};

export const findUsersByUserName = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await fetchUsersbyUserName(req.body.username);
    res.status(200);
    res.json({ users: users });
  } catch (error) {
    res.status(404);
    res.json({ msg: "cannot find user" });
  }
};

export const getUserByUsername = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await fetchUserbyUserName(req.params.username);
    res.status(200);
    res.json({ user: user });
  } catch (error) {
    res.status(404);
    res.json({ msg: "cannot find user" });
  }
};

export const getFeed = async (req: Request, res: Response) => {
  try {
    const posts = await fetchFeed(
      req.session.user.email,
      parseInt(req.params.num, 10)
    );
    res.status(200);
    res.json({ posts: posts });
  } catch (error) {
    res.status(404);
    res.json({ msg: "cannot fetch posts" });
  }
};

export const changeNames = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const email = req.session.user.email;
  try {
    await updateNames(
      email,
      req.body.username,
      req.body.givenName,
      req.body.middleName,
      req.body.familyName
    );

    req.session.user.username = req.body.username;
    req.session.user.givenName = req.body.givenName;
    req.session.user.middleName = req.body.middleName;
    req.session.user.familyName = req.body.familyName;

    res.status(200);
    res.json({ msg: "success" });
  } catch (error) {
    res.status(404);
    res.json({ msg: "cannot find user" });
  }
};

export const changeOnboarded = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const email = req.session.user.email;
    await updateUserOnboarded(email, req.body.onboarded).then(() => {
      res.status(200);
      res.json({ msg: "success" });
    });
  } catch (error) {
    res.status(404);
    res.json({ msg: "update onboard fail" });
  }
};

export const changeAccountVisibility = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const email = req.session.user.email;
    await updateUserVisibility(email, req.body.isPrivate).then(() => {
      res.status(200);
      res.json({ msg: "Success" });
    });
  } catch (error) {
    res.status(404);
    res.json({ msg: "update visibility fail" });
  }
};

export const changeShowRandomSong = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const email = req.session.user.email;
    await updateShowRandomSong(email, req.body.showRandomSong).then(() => {
      res.status(200);
      res.json({ msg: "Success" });
    });
  } catch (error) {
    res.status(404);
    res.json({ msg: "update ShowRandomSong fail" });
  }
};

/*
    Author: David Kim
    This is a service for Deleting a document associated with google email
    @returns Promise<Void>
*/
export const deleteUserInControllers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const username = req.session.user.username;

  try {
    await req.session.destroy(async (error) => {
      if (error) {
        res.status(500);
        res.json({ msg: "delete fail" });
      } else {
        await deleteUserInServices(username);
        res.status(200);
        res.json({ msg: "delete success" });
      }
    });
  } catch (error) {
    res.status(404);
    res.json({ msg: "Cannot find user in Delete User" });
  }
};

export const unlinkSpotify = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const email = req.session.user.email;

  try {
    await removeSpotifyTokens(email);
    res.status(200);
    res.json({ msg: "spotify token removed" });
  } catch (error) {
    res.status(404);
    res.json({ msg: "Cannot remove spotify token" });
  }
};

export const unlinkApple = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const email = req.session.user.email;

  try {
    await removeAppleToken(email);
    res.status(200);
    res.json({ msg: "apple token removed" });
  } catch (error) {
    res.status(404);
    res.json({ msg: "Cannot remove apple token" });
  }
};

export const updateProfilePhoto = (req: Request, res: Response) => {
  const email = req.session.user.email;
  const imageName = req.file.filename;

  try {
    updatePFP(email, req.file.filename);
    res.status(200);
    res.json({ msg: "success" });
  } catch (error) {
    console.error(error);
    res.json({ msg: "failed" });
  }

  res.send({ imageName });
};

export const updateProfileURL = (req: Request, res: Response) => {
  const email = req.session.user.email;
  const url = req.body.url;

  try {
    updatePFPUrl(email, url);
    res.status(200);
    res.json({ msg: "success" });
  } catch (error) {
    console.error(error);
    res.json({ msg: "failed" });
  }
};

export const updateBackgroundPhoto = (req: Request, res: Response) => {
  const email = req.session.user.email;
  const imageName = req.file.filename;

  try {
    updateBackground(email, req.file.filename);
    res.status(200);
    res.json({ msg: "success" });
  } catch (error) {
    console.error(error);
    res.json({ msg: "failed" });
  }

  res.send({ imageName });
};

export const updateBackgroundURL = (req: Request, res: Response) => {
  const email = req.session.user.email;
  const url = req.body.url;

  try {
    updateBURL(email, url);
    res.status(200);
    res.json({ msg: "success" });
  } catch (error) {
    console.error(error);
    res.status(500);
    res.json({ msg: "failed" });
  }
};

export const getProfilePhoto = (req: Request, res: Response) => {
  const imageName = req.params.imageName;
  try {
    if (fs.existsSync(`images/${imageName}`)) {
      const readStream = fs.createReadStream(`images/${imageName}`);
      readStream.pipe(res);
    }
  } catch (error) {
    res.status(500);
    res.json({ msg: "failed to get image" });
    console.error(error);
  }
};

export const getPlatform = async (req: Request, res: Response) => {
  try {
    let platform = await getDefaultPlatform(req.session.user.email);
    res.status(201);
    res.json({ platform: platform });
  } catch (error) {
    res.status(500);
    res.json({ error: error });
  }
};

export const setPlatform = async (req: Request, res: Response) => {
  try {
    await setDefaultPlatform(req.session.user.email, req.body.platform);
    res.status(200);
    res.json({ msg: "success" });
  } catch (error) {
    res.status(500);
    res.json({ error: error });
  }
};

export const getActivity = async (req: Request, res: Response) => {
  try {
    const activity = await getFriendActivity(req.session.user.email);
    res.status(201);
    res.json({ activity: activity });
  } catch (error) {
    res.status(500);
    res.json({ error: error });
  }
};

export const setActivity = async (req: Request, res: Response) => {
  try {
    await setPlayingSong(req.session.user.email, req.body.song);
    res.status(201);
  } catch (error) {
    res.status(500);
    res.json({ error: error });
  }
};

export const setDisplaySong = async (req: Request, res: Response) => {
  try {
    await setShowSong(req.session.user.email, req.body.set);
    res.status(200);
    res.json({ msg: "Success" });
  } catch (error) {
    res.status(500);
    res.json({ error: error });
  }
};

export const setUserBio = async (req: Request, res: Response) => {
  try {
    await updateUserBio(req.session.user.username, req.body.bio);
    res.status(200);
    res.json({ msg: "Bio update success" });
  } catch (error) {
    res.status(500);
    res.json({ error: error });
  }
};

export const getPostAnalytics = async (req: Request, res: Response) => {
  try {
    const analytics = await getAnalytics(req.session.user.email);
    res.status(200);
    res.json({ analytics: analytics });
  } catch (error) {
    res.status(500);
    res.json({ error: error });
  }
};
