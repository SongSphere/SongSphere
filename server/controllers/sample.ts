import { Request, Response, NextFunction } from "express"

export const welcome = (req: Request, res: Response, next: NextFunction) => {
    res.send("Welcome to the backend");
}