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
  try {
    const userData = await validateToken(token);
    const exist = checkUser(userData.email, User);
    if (exist) {
      const user = await User.findOneAndUpdate(
        { email: userData.email },
        { updatedAt: new Date(0) },
        { new: true }
      );
    } else {
      const user = await createUser(userData, token, User);
      await saveUser(user);
    }
  } catch (error) {
    res.status(500);
    res.json({ error: error });
  }
};
