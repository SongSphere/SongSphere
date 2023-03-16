import express from "express";
import {
  sessionUpdate,
  changeNames,
  deleteUserInControllers,
  updateProfilePhoto,
  getPhoto,
  findUserByUserName,
  changeOnboarded,
  updateBackgroundPhoto,
  unlinkSpotify,
  unlinkApple,
  updateProfileURL,
  updateBackgroundURL,
  findUsersByUserName,
  getFeed,
} from "../controllers/user";
import { getUserPosts } from "../controllers/posting";

// import middleware
import auth from "../middleware/auth";

const router = express.Router();

router.get("/user", auth, sessionUpdate);
router.post("/api/user/posts", auth, getUserPosts);
router.post("/api/user/onboard", auth, changeOnboarded);
router.post("/api/user/unlinkSpotify", auth, unlinkSpotify);
router.post("/api/user/unlinkApple", auth, unlinkApple);
router.post("/api/user/adjustNames", auth, changeNames);
router.post("/api/user/deleteAccount", auth, deleteUserInControllers);
router.post("/api/user/queryUsernames", auth, findUsersByUserName);
router.post("/api/user/queryUsername", auth, findUserByUserName);
router.get("/api/user/getFeed", auth, getFeed);

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

router.get("/user/images/:imageName", getPhoto);
router.get("/user/background/:imageName", getPhoto);

export default router;
