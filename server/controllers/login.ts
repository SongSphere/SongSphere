// import packages
import { Request, Response, NextFunction } from "express";

// import db
import { User } from "../db/user";

// import services
import { validateToken } from "../services/google-login";
import {
  createUser,
  saveUser,
  checkUser,
  updateUserToken,
} from "../services/db";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.body;
  try {
    const userData = await validateToken(token);
    const exist = await checkUser(userData.email, User);
    if (exist) {
      // exist == document with _id
      await updateUserToken(userData.email, token, User);
    } else {
      // exist == null
      const user = await createUser(userData, token, User);
      await saveUser(user);
    }
  } catch (error) {
    console.error(error);
    res.status(500);
    res.json({ error: error });
  }
};
