import React, { Dispatch } from "react";
import { textChangeRangeNewSpan } from "typescript";
import { TSong } from "../types/song";

const appleSearch = async (term: string, types: string, limit: number) => {
  const list: TSong[] = [];
  if (term === "") return list;

  const music = MusicKit.getInstance();

  await music.authorize();

  const response = await music.api.search(term, {
    types: types,
    limit: limit,
    offset: 0,
  });

  console.log(response);

  const songs = Object.values(response)[0].data;
  // const id = Object.values(response)[0].data[0].id;
  // await music.setQueue({ song: id });
  songs.forEach(function (entry: any) {
    list.push({
      name: entry.attributes.name,
      artist: entry.attributes.artistName,
      albumName: entry.attributes.albumName,
      id: entry.id,
      service: "apple",
    });
  });

  return list;
};

export default appleSearch;
