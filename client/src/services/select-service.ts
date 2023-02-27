import React, { Dispatch, useContext } from "react";
import { textChangeRangeNewSpan } from "typescript";
import { TSong } from "../types/song";
import appleSearch from "./apple-search";
import { userSessionContext, TUser } from "../context/userSessionContext";
import { spotifySearch } from "./spotify-search";

const selectService = async (postService: string, song: TSong) => {
  let list: TSong[] = [];
  const { isLoggedIn, setIsLoggedIn, user, setUser } =
    useContext(userSessionContext);

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
    appleSearch(song.name!, "song", 1).then((result) => {
      list = result;
    });
  } else {
    spotifySearch(song.name!, "song", user?.spotifyToken!, 1).then((result) => {
      list = result;
    });
  }

  return list[0].id;
};

export default selectService;
