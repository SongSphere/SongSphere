import React, { Dispatch } from "react";
import { textChangeRangeNewSpan } from "typescript";

const search = async (term: string, types: string) => {
  if (term === "") return;

  const music = MusicKit.getInstance();

  await music.authorize();

  const response = await music.api.search(term, {
    types: "songs",
    limit: 25,
    offset: 0,
  });

  //console.log(Object.keys(response));

  const songs = Object.values(response)[0].data;
  songs.forEach(function (entry: any) {
    console.log(term);
    console.log(entry.attributes.name);
    //document.getElementsByName("name").innerHTML = entry;
  });
  //console.log(Object.values(response)[0].data[0]);
  //   response.forEach(function (entry) {
  //     console.log(entry);
  //   });
  const res = response[1] as MusicKit.Resource;
  //console.log(typeof response[1]);

  //   const result = await music.api.music(`/v1/catalog/us/search`, {
  //     term: term,
  //     types: types,
  //   });

  //term: string, parameters?: QueryParameters
  //   console.log(response);
  //   console.log(response[0]);
  //   console.log(response.get("songs"));
};

export default search;
