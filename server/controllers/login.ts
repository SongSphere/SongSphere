// import packages
import { Request, Response, NextFunction } from "express";

// import db
import { User } from "../db/user";

// import services
import { validateToken } from "../services/google-login";
import { createUser, saveUser, checkUser } from "../services/db";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.body;
  const userData = await validateToken(token);
  const user = await createUser(userData, token, User);
  await saveUser(user);
};
