const setFalseRandomSong = async (email: string | undefined) => {
    return new Promise<Boolean>(async (resolve, reject) => {
      await fetch(`${process.env.REACT_APP_API}/api/user/showRandomSong`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          showRandomSong: false,
        }),
      })
        .then(async (res) => {
          resolve(true)
        })
        .catch((error) => {
          reject(false)
        });
    })
  };

export default setFalseRandomSong;