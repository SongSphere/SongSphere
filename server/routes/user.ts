import express from "express";
import {
  sessionUpdate,
  changeNames,
  deleteUserInControllers,
} from "../controllers/user";
import { getUserPosts } from "../controllers/posting";

// import middleware
import auth from "../middleware/auth";

const router = express.Router();

router.get("/user", auth, sessionUpdate);
router.post("/api/user/posts", auth, getUserPosts);
router.post("/user/adjustNames", auth, changeNames);
router.post("/user/deleteAccount", auth, deleteUserInControllers);

export default router;
