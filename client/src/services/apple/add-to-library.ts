import React, { Dispatch } from "react";
import { textChangeRangeNewSpan } from "typescript";
import { TMusicContent } from "../../types/music-content";

// It must be a Song ID for now...
export const addToAppleLibrary = async (
  id: string,
  musicInstance: MusicKit.MusicKitInstance
) => {
  try {
    // Example for albums
    // await musicInstance.api.addToLibrary({ albums: [id] });

    await musicInstance.api.addToLibrary({ songs: [id] });
  } catch (error) {
    console.log(error);
  }
};
