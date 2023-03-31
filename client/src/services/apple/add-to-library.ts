import React, { Dispatch } from "react";
import { textChangeRangeNewSpan } from "typescript";
import { TMusicContent } from "../../types/music-content";

// It must be a Song ID for now...
export const addToAppleLibrary = async (
  id: string,
  musicInstance: MusicKit.MusicKitInstance
) => {
  return new Promise(async (resolve, reject) => {
    await musicInstance.api
      .addToLibrary({ songs: [id] })
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
