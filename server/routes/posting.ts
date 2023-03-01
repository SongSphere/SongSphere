// import packages
import express from "express";

// import controllers
import {
  deletePost,
  editPost,
  getPostsOfGivenUser,
  storePost,
} from "../controllers/posting";

// import middleware
import auth from "../middleware/auth";

const router = express.Router();

router.post("/api/makepost", auth, storePost);
router.post("/api/editpost", auth, editPost);
router.post("/api/removepost", auth, deletePost);
router.post("/api/getpostsofuser", auth, getPostsOfGivenUser);

export default router;
