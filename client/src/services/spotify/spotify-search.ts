import { TMusicContent } from "../../types/music-content";
import { spotifyApiCall } from "./spotify-api-call";

export const spotifySearch = async (
  query: string,
  category: string,
  token: string,
  refresh_token: string,
  limit: number
) => {
  if (query === "") return [];

  let type = "track"; // default to track

  if (category === "albums") {
    type = "album";
  } else if (category === "artists") {
    type = "artist";
  }

  let content: TMusicContent[] = [];

  await spotifyApiCall(
    `/search?q=${encodeURIComponent(query)}&type=${type}&limit=${limit}`,
    token,
    refresh_token
  )
    .then(async (res) => {
      return res?.json();
    })
    .then((data) => {
      if (type === "track") {
        const tracks = data.tracks.items;

        tracks.forEach(function (track: any) {
          content.push({
            name: track.name,
            artist: track.artists[0].name,
            albumName: track.album.name,
            id: track.id,
            service: "spotify",
            category: "song",
            cover: track.album.images[0].url,
          });
        });
      } else if (type === "album") {
        const albums = data.albums.items;

        albums.forEach(function (track: any) {
          content.push({
            name: track.name,
            artist: track.artists[0].name,
            id: track.id,
            service: "spotify",
            category: type,
            cover: track.album.images[0].url,
          });
        });
      } else {
        const artists = data.artists.items;

        artists.forEach(function (track: any) {
          content.push({
            name: track.name,
            id: track.id,
            service: "spotify",
            category: type,
            cover: track.album.images[0].url,
          });
        });
      }
    });

  return content;
};
