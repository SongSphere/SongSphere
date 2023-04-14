import React, { Dispatch } from "react";
import { textChangeRangeNewSpan } from "typescript";
import { TMusicContent } from "../../types/music-content";
import { TPlaylist } from "../../types/playlist";

// Use a playlist's ID to access its songs
// MusicKit doesn't provide cover or # of songs

export const getApplePlaylists = async (
  limit: number,
  musicInstance: MusicKit.MusicKitInstance
) => {
  console.log("start");
  const list: TPlaylist[] = [];

  await musicInstance.api.library
    .playlists(null, {
      limit: limit,
      //relationships: "tracks",
    })
    .then((response) => {
      response.forEach(async function (entry: any) {
        // const response = await musicInstance.api.library.playlist(
        //   entry.attributes.id,
        //   {}
        // );
        // console.log(response);
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
