// import packages
import express from "express";

// import controllers
import { signInUp, testauth, signout } from "../controllers/auth";

// import middleware
import auth from "../middleware/auth";

const router = express.Router();

router.post("/api/auth/google", signInUp);
router.get("/api/auth/signout", signout);
router.get("/api/testauth", auth, testauth);

export default router;
