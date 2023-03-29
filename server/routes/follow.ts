// import packages
import express from "express";

// import controllers
import {
  follow,
  getFollowRequests,
  processFollowRequest,
  unfollow,
  block,
  unblock,
} from "../controllers/follow";

// import middleware
import auth from "../middleware/auth";

const router = express.Router();

router.post("/api/addfollower", auth, follow);
router.post("/api/removefollower", auth, unfollow);
router.get("/api/followRequest/:username", auth, getFollowRequests);
router.post("/api/followRequest", auth, processFollowRequest);

router.post("/api/addblockedaccount", auth, block);
router.post("/api/removeblockedaccount", auth, unblock);

export default router;
