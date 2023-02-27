// import packages
import express from "express";

// import controllers
import { addFollower, removeFollower } from "../controllers/follow";

// import middleware
import auth from "../middleware/auth";

const router = express.Router();

router.post("/api/addfollower", auth, addFollower);
router.post("/api/removefollower", auth, removeFollower);

export default router;
