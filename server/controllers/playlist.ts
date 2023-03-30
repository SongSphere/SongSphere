import { Request, Response, NextFunction } from "express";
import { fetchPlaylist } from "../services/playlist";

export const getPlayList = async (req: Request, res: Response) => {
  try {
    const username = req.session.user.username;
    const playlist = await fetchPlaylist(username);
    res.status(201);
    res.json({ playlist: playlist });
  } catch (error) {
    res.status(500);
    res.json({ error: error });
  }
};
