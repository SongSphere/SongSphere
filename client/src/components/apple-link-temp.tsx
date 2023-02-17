/*
  This is a temporary test component for linking to Apple Music API
*/

import React from "react";

// import services
import { useEffect } from "react";

const setUp = async () => {
  // Call configure() to configure an instance of MusicKit on the Web.
  try {
    await MusicKit.configure({
      developerToken:
        "eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjM2VzdNUlpRN00ifQ.eyJpYXQiOjE2NzY2MDc0NjQsImV4cCI6MTY5MjE1OTQ2NCwiaXNzIjoiIn0.O0HC0HnyP0Q4Qew-dqSxBi_PdPbu8eNI0y8w0AGGgI-TIa69JE7vyfAp-UmwKa-yQ8baNXs2Q9A3rm9NvnKqUg",
      //developerToken: token,
      app: {
        name: "SongSphere",
        build: "1978.4.1",
      },
    });
  } catch (err) {
    console.log(err);
  }

  // MusicKit instance is available
  const music = MusicKit.getInstance();
  console.log(music);
  await music.authorize();
  await music.player.play();
};

const test = async () => {
  const music = MusicKit.getInstance();
  console.log(music);
  await music.authorize();
  await music.play();
};

const apple = async () => {
  const music = MusicKit.getInstance();
  console.log(music);
  await music.authorize();

  // Music previews can be played without authorization:
  await music.play();

  // To play the full length of a song, check authorization before calling play():
  await music.authorize();
  await music.play();

  // You should check authorization before accessing user's iCloud Music Library:
  await music.authorize();
  //const { data: result } = await music.api.music("v1/me/library/albums");
  // User's iCloud Music Library Albums
  //console.log(result.data);
};

const AppleLink = () => {
  useEffect(() => {
    setUp();
  });
  return (
    <div>
      {/* <GoogleLogin
        onSuccess={(credentialResponse) => {
          handleLogin(credentialResponse);
        }}
        onError={() => {
          console.error("Login Failed");
        }}
      /> */}
      <script
        src="https://js-cdn.music.apple.com/musickit/v3/musickit.js"
        data-web-components
        async
      ></script>
      <meta name="apple-music-developer-token" content="36W7MRZQ7M" />
      <meta name="apple-music-app-name" content="My Cool Web App" />
      <meta name="apple-music-app-build" content="1.0" />
      <button id="apple-music-authorize">test</button>
      <br></br>
      <button id="apple-music-unauthorize">test</button>
      <h1>hello</h1>
    </div>
  );
};

export default AppleLink;
