import React, { Dispatch } from "react";
import { textChangeRangeNewSpan } from "typescript";
import { TMusicContent } from "../../types/music-content";
import { TPlaylist } from "../../types/playlist";

export const getApplePlaylists = async (
  limit: number,
  musicInstance: MusicKit.MusicKitInstance
) => {
  const list: TPlaylist[] = [];

  await musicInstance.api.library
    .playlists(null, {
      limit: limit,
      include: ["library-songs", "artwork"],
    })
    .then((response) => {
      // Apple Music's search doesn't filter for types, possibly because MusicKit.getInstance().api.search
      // is depricated, I just implemented it here

      console.log(response);
      // const contents = Object.values(response).find((entry) => {
      //   if (entry.data[0].type === types) {
      //     return entry;
      //   }
      // });

      // if (contents === undefined) return [];

      response.forEach(function (entry: any) {
        list.push({
          name: entry.attributes.name,
          id: entry.id,
          service: "apple",
          cover_url: "",
          num_songs: -1,
          tracks_link: "",
        });
      });
    });

  return list;
};

export const getAppleTracksFromPlaylist = async (
  id: string,
  musicInstance: MusicKit.MusicKitInstance
) => {};
