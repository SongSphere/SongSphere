import express from "express";
import {
  sessionUpdate,
  changeNames,
  deleteUserInControllers,
  updateProfilePhoto,
} from "../controllers/user";

// import middleware
import auth from "../middleware/auth";

const router = express.Router();

router.get("/user", auth, sessionUpdate);
router.post("/user/adjustNames", auth, changeNames);
router.post("/user/deleteAccount", auth, deleteUserInControllers);
router.post("/user/updateProfile", auth, updateProfilePhoto);

export default router;
