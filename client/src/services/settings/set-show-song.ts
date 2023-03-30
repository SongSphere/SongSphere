const setShowSong = async (set: boolean) => {
  return new Promise<Boolean>(async (resolve, reject) => {
    await fetch(`${process.env.REACT_APP_API}/api/user/setShowSong`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        set: set,
      }),
    })
      .then(async (res) => {
        resolve(true);
      })
      .catch((error) => {
        reject(false);
      });
  });
};

export default setShowSong;
