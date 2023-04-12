// import packages
import express from "express";

//import controllers 
import {
    newRoom,
    getRoomByOwner,
    getRoomById,
    removeRoom,
    addMember,
    removeMember,
    transferO,
} from "../controllers/party-room"

// import middleware
import auth from "../middleware/auth";

const router = express.Router();

router.post("/api/makeroom", newRoom);
router.post("/api/deleteroom", removeRoom);
router.post("/api/addmember", addMember);
router.post("/api/removemember", removeMember);
router.post("/api/transferOwner", transferO)

router.get("/api/room/find/:username", getRoomByOwner);
router.get("/api/room/:id", getRoomById);


export default router;