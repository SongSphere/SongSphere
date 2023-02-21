import React, { Dispatch } from "react";

var redirect_uri = process.env.REACT_APP_API;

const AUTHORIZE = "https://accounts.spotify.com/authorize"; // authorization url

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID; // client id from env file

const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET; // client secret from env file

const API_TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";

// builds authorization request and links to spotify auth page
const requestSpotifyAuthorization = async () => {
  try {
    let url = AUTHORIZE;

    // build the url body
    url += "?client_id=" + CLIENT_ID;
    url += "&response_type=code";
    url += "&redirect_uri=" + encodeURI(redirect_uri);
    url +=
      "&scope=user-read-private user-read-email user-modify-playback-state user-read-playback-position user-library-read streaming user-read-playback-state user-read-recently-played playlist-read-private";

    // will take user to spotify authorization page
    window.location.href = url;
  } catch (error) {
    // no real error handling rn
    console.log(error);
  }
};

// this function should be called once the user is redirected back to our website after
// they have logged in on spotify's auth page
function handleAPIRedirect() {
  let code = getCode();

  fetchAccessToken(code);
}

// builds url and makes api call to get the user auth token
function fetchAccessToken(code) {
  let body = "grant_type=authorization_code";

  // add code, redirect uri (takes back to webpage), client id, client secret
  body += "&code=" + code;
  body += "&redirect_uri=" + encodeURI(redirect_uri);
  body += "&client_id=" + CLIENT_ID;
  body += "&client_secret=" + CLIENT_SECRET;

  callAuthAPI(body);
}

function callAuthAPI(body) {
  // build request
  let xhr = new XMLHttpRequest();

  xhr.open("POST", API_TOKEN_ENDPOINT, true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.setRequestHeader(
    "Authorization",
    "Basic " + btoa(CLIENT_ID + ":" + CLIENT_SECRET)
  );

  // send api request
  xhr.send(body);

  // handle response
  xhr.onload = handleAuthorizationResponse;
}

// handles response from api
function handleAuthorizationResponse() {
  // check for success
  if (this.status == 200) {
    var data = JSON.parse(this.responseText);

    var data = JSON.parse(this.responseText);

    if (data.access_token != undefined) {
      var access_token = data.access_token;

      // TODO need to save the provided access token
      // write to database ?
    }
    if (data.refresh_token != undefined) {
      var refresh_token = data.refresh_token;

      // TODO need to save the refresh token
      // write to database
    }
  } else {
    console.log(this.responseText);
    alert(this.responseText);
  }
}

// parses the users code (needed for auth token call) from redirect url
function getCode() {
  let code = null;

  const uriString = window.location.search;

  // if the uri has query params
  if (uriString.length > 0) {
    const urlParameters = new URLSearchParams(uriString);
    code = urlParameters.get("code");
  }

  return code;
}
