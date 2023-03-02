import express from "express";
import {
  sessionUpdate,
  changeNames,
  deleteUserInControllers,
  updateProfilePhoto,
  getProfilePhoto,
} from "../controllers/user";
import fs from "fs";

// import middleware
import auth from "../middleware/auth";

const router = express.Router();

router.get("/user", auth, sessionUpdate);
router.post("/user/adjustNames", auth, changeNames);
router.post("/user/deleteAccount", auth, deleteUserInControllers);

import multer from "multer";
const upload = multer({ dest: "images/" });
router.post(
  "/user/updateProfile",
  upload.single("image"),
  auth,
  updateProfilePhoto
);

router.get("/user/images/:imageName", getProfilePhoto);

export default router;
