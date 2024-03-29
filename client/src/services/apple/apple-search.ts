import React, { Dispatch } from "react";
import { textChangeRangeNewSpan } from "typescript";
import { TMusicContent } from "../../types/music-content";

const appleSearch = async (
  term: string,
  types: string,
  limit: number,
  musicInstance: MusicKit.MusicKitInstance
) => {
  const list: TMusicContent[] = [];
  if (term === "") return list;

  await musicInstance.api
    .search(term, {
      types: "library-songs",
      limit: limit,
      offset: 0,
    })
    .then((response) => {
      // Apple Music's search doesn't filter for types, possibly because MusicKit.getInstance().api.search
      // is depricated, I just implemented it here
      const contents = Object.values(response).find((entry) => {
        if (entry.data[0].type === types) {
          return entry;
        }
      });

      if (contents === undefined) return [];

      contents.data.forEach(function (entry: any) {
        list.push({
          name: entry.attributes.name,
          artist: entry.attributes.artistName,
          albumName: entry.attributes.albumName,
          id: entry.id,
          service: "apple",
          category: types.slice(0, -1),
          cover: entry.attributes.artwork.url
            .replace("{w}", 1000)
            .replace("{h}", 1000),
        });
      });
    });

  return list;
};

export default appleSearch;
