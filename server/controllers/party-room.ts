// import packages
import { Request, Response } from "express";

// import services

import {
  createPartyRoom,
  saveRoom,
  fetchRoomByOwner,
  fetchRoomById,
  deleteRoom,
  addListener,
  deleteListener,
  transferOwner,
  addToQueue,
  addInvitation,
  deleteInvitation,
  removeFromQueue,
  moveUpQueue,
  moveDownQueue,
  sendInvitationEmail,
  blockUser,
  updatePartyRoom,
} from "../services/party-room";

export const newRoom = async (req: Request, res: Response) => {
  try {
    const room = await createPartyRoom(req.body.room);
    await saveRoom(room);
    res.status(201);
    res.json({ msg: "success" });
  } catch (error) {
    console.error(error);
    res.status(500);
    res.json({ error: error });
  }
};

export const getRoomByOwner = async (req: Request, res: Response) => {
  try {
    const room = await fetchRoomByOwner(req.params.username);
    res.status(201);
    res.json({ room: room });
  } catch (error) {
    res.status(500);
    res.json({ error: error });
  }
};

export const getRoomById = async (req: Request, res: Response) => {
  try {
    const room = await fetchRoomById(req.params.id);
    res.status(201);
    res.json({ room: room });
  } catch (error) {
    res.status(500);
    res.json({ error: error });
  }
};

export const removeRoom = async (req: Request, res: Response) => {
  try {
    await deleteRoom(req.body.room);
    await updatePartyRoom(req.body.room.ownerUsername, "");
    res.status(201);
    res.json({ msg: "success" });
  } catch (error) {
    res.status(500);
    res.json({ error: error });
  }
};

export const addMember = async (req: Request, res: Response) => {
  try {
    await addListener(req.body.roomId, req.body.username);
    await updatePartyRoom(req.body.username, req.body.roomId);
    res.status(201);
    res.json({ msg: "success" });
  } catch (error) {
    res.status(500);
    res.json({ error: error });
  }
};

export const removeMember = async (req: Request, res: Response) => {
  try {
    await deleteListener(req.body.room, req.body.username);
    await updatePartyRoom(req.body.username, req.body.room._id);
    res.status(201);
    res.json({ msg: "success" });
  } catch (error) {
    res.status(500);
    res.json({ error: error });
  }
};

export const addInvitedMember = async (req: Request, res: Response) => {
  try {
    await addInvitation(req.body.roomId, req.body.username);
    res.status(201);
    res.json({ msg: "success" });
  } catch (error) {
    res.status(500);
    res.json({ error: error });
  }
};

export const removeInvitedMember = async (req: Request, res: Response) => {
  console.log(`${req.body.roomId} ${req.body.username}}`);
  try {
    await deleteInvitation(req.body.roomId, req.body.username);
    res.status(201);
    res.json({ msg: "success" });
  } catch (error) {
    res.status(500);
    res.json({ error: error });
  }
};

export const transferO = async (req: Request, res: Response) => {
  try {
    await transferOwner(req.body.room, req.body.username);
    res.status(201);
    res.json({ msg: "success" });
  } catch (error) {
    res.status(500);
    res.json({ error: error });
  }
};

export const block = async (req: Request, res: Response) => {
  try {
    await blockUser(req.body.room, req.body.username).then(() => {
      deleteListener(req.body.room, req.body.username)
    });
    res.status(201);
    res.json({ msg: "success" });
  } catch (error) {
    res.status(500);
    res.json({ error: error });
  }
};


export const addQueue = async (req: Request, res: Response) => {
  try {
    await addToQueue(req.body.song, req.session.user.username);
    res.status(201);
    res.json({ msg: "success" });
  } catch (error) {
    res.status(500);
    res.json({ error: error });
  }
};

export const removeQueue = async (req: Request, res: Response) => {
  try {
    await removeFromQueue(req.body.index, req.session.user.username);
    res.status(201);
    res.json({ msg: "success" });
  } catch (error) {
    res.status(500);
    res.json({ error: error });
  }
};

export const reorderQueue = async (req: Request, res: Response) => {
  try {
    if (req.body.dir == "up") {
      await moveUpQueue(req.body.index, req.session.user.username);
    } else {
      await moveDownQueue(req.body.index, req.session.user.username);
    }
    res.status(201);
    res.json({ msg: "success" });
  } catch (error) {
    res.status(500);
    res.json({ error: error });
  }
};
export const sendEmail = async (req: Request, res: Response) => {
  try {
    await sendInvitationEmail(
      req.body.roomId,
      req.body.senderUsername,
      req.body.receiverEmail
    );
    res.status(201);
    res.json({ msg: "success" });
  } catch (error) {
    res.status(500);
    res.json({ error: error });
  }
};
