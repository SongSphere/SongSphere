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
      relationships: "tracks",
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

      response.forEach(async function (entry: any) {
        await musicInstance.api.library
          .playlist(entry.attributes.id, {})
          .then((response) => {});
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
) => {
  let songs: TMusicContent[] = [];

  await musicInstance.api.library.playlist(id, {}).then((response) => {
    response.relationships.tracks.data.forEach(function (entry: any) {
      songs.push({
        name: entry.attributes.name,
        artist: entry.attributes.artistName,
        albumName: entry.attributes.albumName,
        id: entry.id,
        service: "apple",
        category: "song",
        cover: entry.attributes.artwork.url
          .replace("{w}", 1000)
          .replace("{h}", 1000),
      });
    });
  });
  console.log(songs);
};
