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
    addInvitation,
    deleteInvitation,

} from "../services/party-room"


export const newRoom = async (req: Request, res:Response) => {
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
        res.json({room: room});
    } 
    catch (error) {
        res.status(500);
        res.json({error: error});
    }
};


export const getRoomById = async (req: Request, res: Response) => {
    try {
        const room = await fetchRoomById(req.params.id);
        res.status(201);
        res.json({room: room});
    } 
    catch (error) {
        res.status(500);
        res.json({error: error});
    }
};

export const removeRoom = async (req: Request, res: Response) => {
    try {
        await deleteRoom(req.body.room);
        res.status(201);
        res.json({ msg: "success" });
    }
    catch(error) {
        res.status(500);
        res.json({error: error});
    }
}

export const addMember = async (req: Request, res: Response) => {
    try {
        await addListener(req.body.roomId, req.body.username);
        res.status(201);
        res.json({ msg: "success" });
    }
    catch(error) {
        res.status(500);
        res.json({error: error});
    }
}

export const removeMember = async (req: Request, res: Response) => {
    try {
        await deleteListener(req.body.room, req.body.username);
        res.status(201);
        res.json({ msg: "success" });
    }
    catch(error) {
        res.status(500);
        res.json({error: error});
    }
}


export const addInvitedMember = async (req: Request, res: Response) => {
    try {
        await addInvitation(req.body.roomId, req.body.username);
        res.status(201);
        res.json({ msg: "success" });
    } 
    catch(error) {
        res.status(500);
        res.json({error: error});
    }

}

export const removeInvitedMember = async (req: Request, res: Response) => {

    try {
        await deleteInvitation(req.body.roomId, req.body.username);
        res.status(201);
        res.json({ msg: "success" });
    }
    catch(error) {
        res.status(500);
        res.json({error: error});
    }

}

export const transferO = async (req: Request, res: Response) => {
    try {
        await transferOwner(req.body.room, req.body.username);
        res.status(201);
        res.json({ msg: "success" });
    }
    catch(error) {
        res.status(500);
        res.json({error: error});
    }
}

