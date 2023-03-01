// import packages
import express from "express";

// import controllers
import { deletePost, editPost, storePost } from "../controllers/posting";

// import middleware
import auth from "../middleware/auth";

const router = express.Router();

router.post("/api/makepost", storePost);
router.post("/api/editpost", editPost);
router.post("/api/removepost", deletePost);

export default router;
