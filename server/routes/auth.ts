// import packages
import express from "express";

// import controllers
import {
  signInUp,
  testauth,
  signout,
  appleAuth,
  spotifyAuth,
  spotifyRefresh,
} from "../controllers/auth";

// import middleware
import auth from "../middleware/auth";

const router = express.Router();

router.post("/api/auth/google", signInUp);
router.get("/api/auth/signout", signout);
router.get("/api/testauth", auth, testauth);

router.post("/api/auth/spotify", auth, spotifyAuth);
router.post("/api/auth/spotifyrefresh", auth, spotifyRefresh);
router.post("/api/auth/apple", auth, appleAuth);

export default router;
