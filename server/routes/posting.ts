// import packages
import express from "express";

// import controllers
import {
  deletePost,
  editPost,
  storePost,
  getPostById,
  getSeedForRandomSong,
  sendComment,
} from "../controllers/posting";

// import middleware
import auth from "../middleware/auth";

const router = express.Router();

router.post("/api/makepost", storePost);
router.post("/api/editpost", editPost);
router.post("/api/removepost", deletePost);
router.get("/api/post/:id", getPostById);
router.get("/api/randomsong/seed", getSeedForRandomSong);
router.post("/api/post/comment", sendComment);

export default router;
