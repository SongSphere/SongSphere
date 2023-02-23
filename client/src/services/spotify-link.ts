import React, { Dispatch } from "react";

const REACT_API = `http://localhost:3000`;

const AUTHORIZE_ENDPOINT = "https://accounts.spotify.com/authorize"; // authorization url

const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";

/*
 *  requestSpotifyAuthorization()
 *
 *  builds authorization request and links to spotify auth page
 */

export const requestSpotifyAuthorization = async () => {
  try {
    let url = AUTHORIZE_ENDPOINT;

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

/*
 *  getToken()
 *
 *  Gets auth code from url, uses it to make call to spotify api, parses token and refresh token. Note this should somehow
 *  be called automatically from the client when spotify redirects back to our site
 */

export const getToken = async () => {
  let code = getAuthorizationCode();

  // this call to the spotify api sends necessary header (client id, client secret) along with the auth code in the body
  await fetch(TOKEN_ENDPOINT, {
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
      redirect_uri: REACT_API,
    }),
  }).then(async (res) => {
    if (res.status == 200) {
      const resData = await res.json();
      let token = resData.access_token;
      let refresh_token = resData.refresh_token;

      sendTokenToServer(token, refresh_token);
    } else {
      console.log("fail");
    }
  });
};

/*
 *  sendTokenToServer()
 *
 *  Sends the token and refesh token to the backend to be stored on the db
 *
 *  @param token: string the auth token from spotify api
 *
 *  @param refresh_token: string the refresh token (use this in post request to spotify api for a new api token)
 */

export const sendTokenToServer = async (
  token: string,
  refresh_token: string
) => {
  try {
    await fetch(`${process.env.REACT_APP_API}/api/auth/spotify`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        token: token,
        refreshToken: refresh_token,
        remove: false,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    console.log(err);
  }
};

/*
 *  getAuthorizationCode()
 *
 *  Parses the code out of the uri from spotify redirect
 */

export const getAuthorizationCode = () => {
  let code = null;

  const uriString = window.location.search; // url from window

  const urlParameters = new URLSearchParams(uriString);
  code = urlParameters.get("code");

  return code;
};
