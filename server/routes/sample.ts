import express from "express";
import { welcome } from "../controllers/sample";

const router = express.Router();

router.get('/', welcome)

export default router;