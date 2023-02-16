// import packages
import { Request, Response, NextFunction } from "express";

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
    const exist = await checkUser(userData.email);
    if (exist) {
      // exist == document with _id
      await updateUserToken(userData.email, token);
    } else {
      // exist == null
      const user = await createUser(userData, token);
      await saveUser(user);
    }

    req.session.user = {
      name: userData.name,
      givenName: userData.given_name,
      familyName: userData.family_name,
      email: userData.email,
      emailVerified: userData.email_verified,
      profileImgUrl: userData.picture,
      token: token,
    };

    res.status(201);
    res.json({ msg: "login success" });
  } catch (error) {
    console.error(error);
    res.status(500);
    res.json({ error: error });
  }
};

export const testauth = (req: Request, res: Response) => {
  res.send("welcome. you are logged in");
};
