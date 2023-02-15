// import packages
import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

// import db
import User, { IUser } from "../db/user";

// import services
import { validateToken } from "../services/google-login";
import {
  createUser,
  saveUser,
  checkUser,
  updateUserToken,
} from "../services/db";
import { rmSync } from "fs";

// export const loginV2 = (
//   User: mongoose.Model<IUser, {}, {}, {}, any>,
//   customRequest: Request,
//   customResponse: Response
// ) => {
//   return async (req: Request, res: Response, next: NextFunction) => {
//     if (customRequest == undefined) customRequest = req;
//     if (customResponse == undefined) customResponse = res;

//     const { token } = customRequest.body;
//     try {
//       const userData = await validateToken(token);
//       const exist = await checkUser(userData.email, User);
//       if (exist) {
//         // exist == document with _id
//         await updateUserToken(userData.email, token, User);
//       } else {
//         // exist == null
//         const user = await createUser(userData, token, User);
//         await saveUser(user);
//       }
//     } catch (error) {
//       console.error(error);
//       customResponse.status(500);
//       customResponse.json({ error: error });
//     }
//   };
// };

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
      res.status(200);
      res.json({ user: user });
    }
  } catch (error) {
    console.error(error);
    res.status(500);
    res.json({ error: error });
  }
};
