import React, { Dispatch, useContext } from "react";
import { textChangeRangeNewSpan } from "typescript";
import { TSong } from "../types/song";
import appleSearch from "./apple-search";
import { userSessionContext, TUser } from "../context/userSessionContext";
import { spotifySearch } from "./spotify-search";

const selectService = async (
  name: string,
  category: string,
  postService: string
) => {
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
    return "";
  } else if (service === "apple") {
    appleSearch(name, category, 1).then((result) => {
      list = result;
    });
  } else {
    spotifySearch(name, category, user?.spotifyToken!, 1).then((result) => {
      list = result;
    });
  }

  list[0].id;
};

export default selectService;
