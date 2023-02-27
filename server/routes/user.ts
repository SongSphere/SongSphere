import express from "express";
import { sessionUpdate, changeNames } from "../controllers/user";

// import middleware
import auth from "../middleware/auth";

const router = express.Router();

router.get("/user", auth, sessionUpdate);
router.post("/user/adjustNames", auth, changeNames);

export default router;
