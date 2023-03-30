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
  getComments,
  sendNotification,
  getSubComments,
  getComment,
} from "../controllers/posting";

// import middleware
import auth from "../middleware/auth";

const router = express.Router();

router.post("/api/makepost", storePost);
router.post("/api/editpost", editPost);
router.post("/api/removepost", deletePost);
router.post("/api/post/comment", sendComment);

router.post("/api/post/notification", sendNotification);


router.get("/api/post/:id", getPostById);
router.get("/api/randomsong/seed", getSeedForRandomSong);




router.get("/api/post/getComments/:id", getComments);
router.get("/api/post/getComment/:id", getComment);
router.get("/api/post/getSubComments/:id", getSubComments);

export default router;
