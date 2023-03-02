import express from "express";
import { sessionUpdate } from "../controllers/user";

// import middleware
import auth from "../middleware/auth";

const router = express.Router();

router.get("/posts/listen", auth, sessionUpdate);

export default router;
