import { TMusicContent } from "../types/music-content";
import { TUser } from "../types/user";
import appleSearch from "./apple-search";
import { spotifySearch } from "./spotify-search";

const selectService = async (
  song: TMusicContent,
  musicInstance: MusicKit.MusicKitInstance,
  user: TUser,
  service: string
) => {
  let bestFitSongId = "-1";

  if (service === song.service || service === "both") {
    bestFitSongId = song.id;
  } else if (song.service === "spotify") {
    await appleSearch(song.name!, "songs", 1, musicInstance).then((result) => {
      if (result.length !== 0) {
        bestFitSongId = result[0].id;
      }
    });
  } else {
    await spotifySearch(song.name!, "tracks", user?.spotifyToken!, 1).then(
      (result) => {
        if (result.length !== 0) {
          bestFitSongId = result[0].id;
        }
      }
    );
  }

  return bestFitSongId;
};

export default selectService;
