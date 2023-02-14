// import packages
import { Request, Response, NextFunction } from "express";

// import db
import User from "../db/user";

// import services
import { validateToken } from "../services/google-login";
import { saveUser } from "../services/db";

export const login = (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.body;
  validateToken(token).then(async (userData) => {
    const user = new User({
      name: userData.name,
      givenName: userData.given_name,
      familyName: userData.family_name,
      email: userData.email,
      emailVerified: userData.email_verified,
      profileImgUrl: userData.picture,
      token: token,
    });

    saveUser(user);
  });
};
