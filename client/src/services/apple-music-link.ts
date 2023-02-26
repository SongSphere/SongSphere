const setUp = async () => {
  // Call configure() to configure an instance of MusicKit on the Web.
  try {
    await MusicKit.configure({
      developerToken: process.env.REACT_APP_APPLE_TOKEN,
      app: {
        name: "SongSphere",
        build: "1978.4.1",
      },
    });
    const music = MusicKit.getInstance();
    const AppleMusicToken = await music.authorize();

    await fetch(`${process.env.REACT_APP_API}/api/auth/apple`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        appleToken: AppleMusicToken,
        remove: false,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("apple worked")
    return true;
  } catch (err) {
    console.log(err);
    return false;
    
  }
};

export default setUp;
