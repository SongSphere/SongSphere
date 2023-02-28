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
