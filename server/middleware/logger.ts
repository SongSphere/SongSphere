/*
    This middleware shows the endpoints that were called with their request 
    method (e.g., GET, POST, etc.)
*/

import { Request, Response, NextFunction } from "express";

const logger = (req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.path}`);
  next();
};

export default logger;
