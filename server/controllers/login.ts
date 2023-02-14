import { Request, Response, NextFunction } from "express";

// import services
import { validateToken } from "../services/google-login";

// import models
import User from "../db/user";

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
    });

    try {
      await user.save();
      res.send(user);
    } catch (error) {
      res.status(500).send(error);
    }
  });
};
