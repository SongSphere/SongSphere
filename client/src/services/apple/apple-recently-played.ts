import { TMusicContent } from "../../types/music-content";

const SPOTIFY_API = "https://api.spotify.com/v1";

export const getAppleRecentlyPlayedSongs = async (
  musicInstance: MusicKit.MusicKitInstance
) => {
  let content: TMusicContent[] = [];

  musicInstance.api
    .recentPlayed({ limit: 10, offset: 0 })
    .then(function (contents) {
      if (contents === undefined) return [];

      contents.forEach(function (entry: any) {
        content.push({
          name: entry.attributes.name,
          artist: entry.attributes.artistName,
          albumName: entry.attributes.name,
          id: entry.id,
          service: "apple",
          category: entry.type.slice(0, -1),
          cover: entry.attributes.artwork.url
            .replace("{w}", 1000)
            .replace("{h}", 1000),
        });
      });
    });
  return content;
};
