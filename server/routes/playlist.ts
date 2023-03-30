// import packages
import express from "express";

// import controllers
import { getPlayList } from "../controllers/playlist";

// import middleware
import auth from "../middleware/auth";

const router = express.Router();

router.get("/api/playlist/:username", auth, getPlayList);

export default router;
