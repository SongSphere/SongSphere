// import packages
import express from "express";

// import controllers
import { follow, unfollow } from "../controllers/follow";

// import middleware
import auth from "../middleware/auth";

const router = express.Router();

router.post("/api/addfollower", auth, follow);
router.post("/api/removefollower", auth, unfollow);

export default router;
