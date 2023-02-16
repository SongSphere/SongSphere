import { Request, Response, NextFunction } from "express";

const auth = async (req: Request, res: Response, next: NextFunction) => {
  if (req.session.user === undefined) {
    res.status(403);
    res.json({ msg: "not logged in" });
  } else {
    next();
  }
};

export default auth;
