import { Request, Response, NextFunction } from "express";
import {
  deleteUserInServices,
  fetchUserByEmail,
  updateNames,
  updatePFP,
} from "../services/db";

export const sessionUpdate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await fetchUserByEmail(req.session.user.email);
    console.log(user);
    res.status(200);
    res.json({ user: user });
  } catch (error) {
    res.status(404);
    res.json({ msg: "cannot find user" });
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
  } catch (error) {
    res.status(404);
    res.json({ msg: "cannot find user" });
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

export const updateProfilePhoto = async (req: Request, res: Response) => {
  const email = req.session.user.email;

  try {
    await updatePFP(email, req.body.blob);
    res.status(200);
  } catch (error) {
    console.log(error);
  }
};
