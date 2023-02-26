import React, { Dispatch } from "react";
import { textChangeRangeNewSpan } from "typescript";
import { TSong } from "../types/song";

const appleSearch = async (term: string, types: string) => {
  const list: TSong[] = [];
  if (term === "") return list;

  const music = MusicKit.getInstance();

  await music.authorize();

  const response = await music.api.search(term, {
    types: "songs",
    limit: 25,
    offset: 0,
  });

  console.log(response);

  const songs = Object.values(response)[0].data;
  // const id = Object.values(response)[0].data[0].id;
  // await music.setQueue({ song: id });
  songs.forEach(function (entry: any) {
    list.push({
      name: entry.attributes.name,
      artist: "",
      albumName: "empty",
      id: entry.id,
      service: "apple",
    });
  });

  return list;
};

export default appleSearch;
