const setRandomSong = async (random: Boolean) => {
  return new Promise<Boolean>(async (resolve, reject) => {
    await fetch(`${process.env.REACT_APP_API}/api/user/showRandomSong`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        showRandomSong: random,
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

export default setRandomSong;
