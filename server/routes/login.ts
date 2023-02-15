import express from "express";
import { login } from "../controllers/login";

import User from "../db/user";

const router = express.Router();

router.post("/api/auth/google", login);

export default router;
