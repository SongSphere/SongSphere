import React, { Dispatch, useContext } from "react";
import { textChangeRangeNewSpan } from "typescript";
import { TMusicContent } from "../types/music-content";
import { TUser } from "../types/user";
import appleSearch from "./apple-search";
import { spotifySearch } from "./spotify-search";

const selectService = async (
  postService: string,
  song: TMusicContent,
  musicInstance: MusicKit.MusicKitInstance,
  user: TUser
) => {
  let list: TMusicContent[] = [];

  const appleToken = user?.appleToken;
  const spotifyToken = user?.spotifyToken;
  let service = "";
  let found = false;

  if (spotifyToken !== "") {
    service = "spotify";
  } else if (appleToken !== "") {
    service = "apple";
  } else {
    console.log("NO SERVICE");
  }

  if (service === postService) {
    return song.id;
  } else if (service === "apple") {
    appleSearch(song.name!, "songs", 1, musicInstance).then((result) => {
      list = result;
    });
  } else {
    spotifySearch(song.name!, "tracks", user?.spotifyToken!, 1).then(
      (result) => {
        list = result;
      }
    );
  }

  return list[0].id;
};

export default selectService;
