import express from "express";
import {
  sessionUpdate,
  changeNames,
  deleteUserInControllers,
  updateProfilePhoto,
  getProfilePhoto,
  getUserByUsername,
  changeOnboarded,
  updateBackgroundPhoto,
  unlinkSpotify,
  unlinkApple,
  updateProfileURL,
  updateBackgroundURL,
  findUsersByUserName,
} from "../controllers/user";
import { getPostsByUsername } from "../controllers/posting";

// import middleware
import auth from "../middleware/auth";

const router = express.Router();

router.get("/user", auth, sessionUpdate);
router.get("/api/user/posts/:username", auth, getPostsByUsername);
router.get("/api/user/:username", auth, getUserByUsername);

router.post("/api/user/onboard", auth, changeOnboarded);
router.post("/api/user/unlinkSpotify", auth, unlinkSpotify);
router.post("/api/user/unlinkApple", auth, unlinkApple);
router.post("/user/adjustNames", auth, changeNames);
router.post("/user/deleteAccount", auth, deleteUserInControllers);
router.post("/user/queryUserNames", auth, findUsersByUserName);

import multer from "multer";
const upload = multer({ dest: "images/" });
router.post(
  "/user/updateProfile",
  upload.single("image"),
  auth,
  updateProfilePhoto
);
router.post("/user/updateProfileURL", auth, updateProfileURL);
router.post(
  "/user/updateBackground",
  upload.single("image"),
  auth,
  updateBackgroundPhoto
);
router.post("/user/updateBackgroundURL", auth, updateBackgroundURL);

router.get("/user/images/:imageName", getProfilePhoto);
router.get("/user/background/:imageName", getProfilePhoto);

export default router;
