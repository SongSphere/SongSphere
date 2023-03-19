import { spotifyRefresh } from "./spotify-link";

const SPOTIFY_API = "https://api.spotify.com/v1";

export const spotifyApiCall = async (
  urlencoded: string,
  access_token: string,
  refresh_token: string
) => {
  console.log("inside spotifyApiCall");

  return await fetch(`${SPOTIFY_API}${urlencoded}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  }).then(async (res1) => {
    console.log("res 1 status: " + res1.status);

    if (res1.status !== 200) {
      // error, refresh the token and try again
      console.log("requesting new token");

      let newToken = await spotifyRefresh(refresh_token);

      await fetch(`${SPOTIFY_API}${urlencoded}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${newToken}`,
        },
      }).then(async (res2) => {
        console.log("res2");
        console.log("res 2 status: " + res2.status);
        // console.log(res2.json());
        return res2;
      });
    } else {
      console.log("res1");
      //   console.log(res1.json());
      return res1;
    }
  });
};
