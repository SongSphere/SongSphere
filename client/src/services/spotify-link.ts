import React, { Dispatch } from "react";

const REACT_API = `http://localhost:3000`;

const AUTHORIZE = "https://accounts.spotify.com/authorize"; // authorization url

// builds authorization request and links to spotify auth page
export const requestSpotifyAuthorization = async () => {
  try {
    let url = AUTHORIZE;

    // build the url body
    url += "?client_id=" + process.env.REACT_APP_SPOTIFY_CLIENT_ID;
    url += "&response_type=code";
    url += "&redirect_uri=" + encodeURI(REACT_API);
    url += "&show_dialog=true"; // leaving as true for now, can be removed when we don't want to go though auth every login

    // this part includes all of the permissions we are requesting access to
    url +=
      "&scope=user-read-private user-read-email user-modify-playback-state user-read-playback-position " +
      "user-library-read streaming user-read-playback-state user-read-recently-played playlist-read-private";

    // will take user to spotify authorization page
    window.location.href = url;
  } catch (error) {
    console.log(error);
  }
};

export const getToken = async () => {
  let code = getCode();

  console.log("code: " + code);

  await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization:
        "Basic " +
        btoa(
          process.env.REACT_APP_SPOTIFY_CLIENT_ID +
            ":" +
            process.env.REACT_APP_SPOTIFY_CLIENT_SECRET
        ),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: `authorization_code`,
      code: `${code}`,
      redirect_uri: `http://localhost:3000`,
    }),
  }).then(async (res) => {
    if (res.status == 200) {
      const resData = await res.json();
      let token = resData.access_token;
      let refresh_token = resData.refresh_token;

      //TODO write to database
      // should be able to do this by making a route call with this data, then will be handled by a controller
    } else {
      console.log("fail");
    }
  });
};

/*
 *  getCode()
 *
 *  this function parses the code out of the uri
 *
 */

export const getCode = () => {
  let code = null;

  const uriString = window.location.search; // url from window

  const urlParameters = new URLSearchParams(uriString);
  code = urlParameters.get("code");

  return code;
};
