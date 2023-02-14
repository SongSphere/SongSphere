import express from "express";
import { login } from "../controllers/login";

const router = express.Router();

router.post("/api/auth/google", login);

export default router;
