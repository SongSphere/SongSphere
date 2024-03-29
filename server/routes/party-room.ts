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
  addQueue,
  addInvitedMember,
  removeInvitedMember,
  removeQueue,
  reorderQueue,
  sendEmail,
  block,
  sendMessage,
  fetchMessages,
  updateQueueIndex,
} from "../controllers/party-room";

// import middleware
import auth from "../middleware/auth";

const router = express.Router();

router.post("/api/makeroom", newRoom);
router.post("/api/deleteroom", removeRoom);
router.post("/api/addmember", addMember);
router.post("/api/removemember", removeMember);
router.post("/api/transferOwner", transferO);
router.post("/api/roomBlock", block);
router.post("/api/addqueue", addQueue);
router.post("/api/removequeue", removeQueue);
router.post("/api/reorderqueue", reorderQueue);
router.post("/api/sendChat", sendMessage);
router.post("/api/updateIndex", updateQueueIndex);

router.post("/api/inviteMember", addInvitedMember);
router.post("/api/uninviteMember", removeInvitedMember);

router.post("/api/transferOwner", transferO);

router.get("/api/room/find/:username", getRoomByOwner);
router.get("/api/room/:id", getRoomById);
router.get("/api/room/fetchChats:id", fetchMessages);

router.post("/api/sendInvitationEmail", sendEmail);

export default router;
