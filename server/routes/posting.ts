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
  addToSpotifyLibrary,
  sendNotification,
  getSubComments,
  getComment,
  updateLikePost,
  updateUnlikePost,
  getPostLiked,
  getCommentLiked,
  fetchLikedPosts,
  updateUnlikeComment,
  updateLikeComment,
  getPostLikes,
  getCommentLikes,
} from "../controllers/posting";

// import middleware
import auth from "../middleware/auth";

const router = express.Router();

router.post("/api/makepost", storePost);
router.post("/api/spotify/addtolib", addToSpotifyLibrary);
router.post("/api/editpost", editPost);
router.post("/api/removepost", deletePost);
router.post("/api/post/comment", sendComment);

router.post("/api/post/notification", sendNotification);

router.get("/api/post/:id", getPostById);
router.get("/api/randomsong/seed", getSeedForRandomSong);

router.get("/api/post/getComments/:id", getComments);
router.get("/api/post/getComment/:id", getComment);
router.get("/api/post/getSubComments/:id", getSubComments);
router.get("/api/post/fetchLikedPosts/:username", auth, fetchLikedPosts);

router.post("/api/post/updateLikePost", auth, updateLikePost);
router.post("/api/post/updateUnlikePost", auth, updateUnlikePost);

router.get("/api/post/fetchPostLikes/:id", auth, getPostLikes);
router.get("/api/post/fetchCommentLikes/:id", auth, getCommentLikes);

router.get("/api/post/fetchPostLiked/:id", auth, getPostLiked);
router.get("/api/post/fetchCommentLiked/:id", auth, getCommentLiked);

router.post("/api/post/updateLikeComment", auth, updateLikeComment);
router.post("/api/post/updateUnlikeComment", auth, updateUnlikeComment);

export default router;
