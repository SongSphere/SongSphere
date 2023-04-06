// import packages
import express from "express";

//import controllers 
import {
    newRoom,
} from "../controllers/party-room"

// import middleware
import auth from "../middleware/auth";

const router = express.Router();

router.post("/api/makeroom", newRoom);

export default router;