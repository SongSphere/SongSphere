// import packages
import { Request, Response, NextFunction } from "express";

// import db
import User from "../db/user";

// import services
import { validateToken } from "../services/google-login";
import { createUser, saveUser } from "../services/db";

export const login = (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.body;
  validateToken(token).then(async (userData) => {
    const user = createUser(userData, token);
    saveUser(await user);
  });
};
