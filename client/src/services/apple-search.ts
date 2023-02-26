import React, { Dispatch } from "react";
import { textChangeRangeNewSpan } from "typescript";

const appleSearch = async (term: string, types: string) => {
  const list: string[][] = [];
  if (term === "") return list;

  const music = MusicKit.getInstance();

  await music.authorize();

  const response = await music.api.search(term, {
    types: "songs",
    limit: 25,
    offset: 0,
  });

  const songs = Object.values(response)[0].data;
  // const id = Object.values(response)[0].data[0].id;
  // await music.setQueue({ song: id });
  songs.forEach(function (entry: any) {
    list.push([entry.attributes.name, entry.id]);
  });

  return list;
};

export default appleSearch;
