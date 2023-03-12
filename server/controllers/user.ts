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
} from "../services/db";
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
    console.log("Printed in user.ts in controllers backend");
    console.log(req.body.username.toString);
    //console.log(req.body.userName.toString);
    const users = await fetchUsersbyUserName(req.body.username);
    res.status(200);
    res.json({ users: users });
  } catch (error) {
    res.status(404);
    res.json({ msg: "cannot find user" });
  }
};

export const findUserByUserName = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await fetchUserbyUserName(req.body.username);
    res.status(200);
    res.json({ user: user });
  } catch (error) {
    res.status(404);
    res.json({ msg: "cannot find user" });
  }
};

export const getFeed = async (req: Request, res: Response) => {
  try {
    const posts = await fetchFeed(req.body.email);
    return posts;
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
  const email = req.session.user.email;

  try {
    await deleteUserInServices(email);
    res.status(200);
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
    console.log(error);
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
    console.log(error);
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
    console.log(error);
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
    console.log(error);
    res.json({ msg: "failed" });
  }
};

export const getPhoto = (req: Request, res: Response) => {
  const imageName = req.params.imageName;
  try {
    if (fs.existsSync(`images/${imageName}`)) {
      const readStream = fs.createReadStream(`images/${imageName}`);
      readStream.pipe(res);
    }
  } catch (error) {
    console.log("hi");
    res.status(500);
    res.json({ msg: "failed to get image" });
    console.error(error);
  }
};
