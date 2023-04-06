// import packages
import { Request, Response } from "express";

// import services

import {
    createPartyRoom,
    saveRoom,
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
}

