// import packages
import express from "express";

// import controllers
import { signInUp, testauth, signout, spotifyAuth } from "../controllers/auth";
import { signInUp, testauth, signout, appleAuth, spotifyAuth } from "../controllers/auth";

// import middleware
import auth from "../middleware/auth";

const router = express.Router();

router.post("/api/auth/google", signInUp);
router.get("/api/auth/signout", signout);
router.get("/api/testauth", auth, testauth);

router.post("/api/auth/spotify", auth, spotifyAuth); // route for spotify authorization for user token
router.post("/api/auth/apple", auth, appleAuth);

export default router;
