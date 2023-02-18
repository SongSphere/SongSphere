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
      developerToken: process.env.APPLE_TOKEN,
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
  await music.authorize();
  await music.play();
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
  return <div></div>;
};

export default AppleLink;
