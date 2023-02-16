// import packages
import express from "express";

// import controllers
import { login, testauth, signout } from "../controllers/login";

// import middleware
import auth from "../middleware/auth";

const router = express.Router();

router.post("/api/auth/google", login);
router.get("/api/auth/signout", signout);
router.get("/api/testauth", auth, testauth);

export default router;
