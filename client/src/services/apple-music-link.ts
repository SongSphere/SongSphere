export const appleMusicConfigure =
  async (): Promise<MusicKit.MusicKitInstance> => {
    // Call configure() to configure an instance of MusicKit on the Web.
    return new Promise<MusicKit.MusicKitInstance>(async (resolve, reject) => {
      try {
        await MusicKit.configure({
          developerToken: process.env.REACT_APP_APPLE_TOKEN,
          app: {
            name: "SongSphere",
            build: "1978.4.1",
          },
        });
        console.log(MusicKit);
        const music = MusicKit.getInstance();
        resolve(music);
      } catch (err) {
        console.log(err);
        reject();
      }
    });
  };

export const appleAuth = async (music: MusicKit.MusicKitInstance) => {
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
};
