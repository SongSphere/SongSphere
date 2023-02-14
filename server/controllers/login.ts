import { Request, Response, NextFunction } from "express";

// import services
import { validateToken } from "../services/google-login";

export const login = (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.body;
  validateToken(token).then(({ name, email, picture }) => {
    console.log(name);
    console.log(email);
    console.log(picture);
  });
};
