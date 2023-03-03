import express from "express";
import {
  sessionUpdate,
  changeNames,
  deleteUserInControllers,
  updateProfilePhoto,
  getProfilePhoto,
  findUserByUserName,
  changeOnboarded,
  updateBackgroundPhoto,
} from "../controllers/user";
import { getUserPosts } from "../controllers/posting";

// import middleware
import auth from "../middleware/auth";

const router = express.Router();

router.get("/user", auth, sessionUpdate);
router.post("/api/user/posts", auth, getUserPosts);
router.post("/api/user/onboard", auth, changeOnboarded);
router.post("/user/adjustNames", auth, changeNames);
router.post("/user/deleteAccount", auth, deleteUserInControllers);
router.post("/user/queryUserName", auth, findUserByUserName);

import multer from "multer";
const upload = multer({ dest: "images/" });
router.post(
  "/user/updateProfile",
  upload.single("image"),
  auth,
  updateProfilePhoto
);
router.post(
  "/user/updateBackground",
  upload.single("image"),
  auth,
  updateBackgroundPhoto
);

router.get("/user/images/:imageName", getProfilePhoto);
router.get("/user/background/:imageName", getProfilePhoto);

export default router;
