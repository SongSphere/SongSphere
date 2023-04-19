import { TMusicContent } from "../../types/music-content";
import { TUser } from "../../types/user";
import appleSearch from "../apple/apple-search";
import { spotifySearch } from "../spotify/spotify-search";

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
    await appleSearch(song.name!, "songs", 20, musicInstance).then((result) => {
      if (result.length !== 0) {
        for (let i = 0; i < result.length; i++) {
          if (result[i].artist == song.artist && result[i].name == song.name) {
            bestFitSongId = result[i].id;
            break;
          }
        }
      }
    });
  } else {
    await spotifySearch(song.name!, "tracks", user?.spotifyToken!, 20).then(
      (result) => {
        if (result.length !== 0) {
          for (let i = 0; i < result.length; i++) {
            if (
              result[i].artist == song.artist &&
              result[i].name == song.name
            ) {
              bestFitSongId = result[i].id;
              break;
            }
          }
        }
      }
    );
  }

  return bestFitSongId;
};

export default selectService;
