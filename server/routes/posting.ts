// import packages
import express from "express";

// import controllers
import { storePost } from "../controllers/posting";

// import middleware
import auth from "../middleware/auth";

const router = express.Router();

router.post("/api/makepost", auth, storePost);

export default router;
