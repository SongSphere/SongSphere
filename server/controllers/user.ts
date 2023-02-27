import { Request, Response, NextFunction } from "express";
import { fetchUserByEmail, updateNames } from "../services/db";

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

export const changeNames = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const email = req.session.user.email;

  try {
    console.log(email)
    await updateNames(email, req.body.username, req.body.givenName, req.body.middleName, req.body.familyName);
    console.log("Found and update controllers")
    res.status(200);
  } catch (error) {
    res.status(404);
    res.json({ msg: "cannot find user" });
  }
};
