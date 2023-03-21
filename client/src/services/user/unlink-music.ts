const unlinkMusic = async (service: string) => {
  return new Promise(async (resolve, reject) => {
    if (service == "apple") {
      await fetch(`${process.env.REACT_APP_API}/api/user/unlinkApple`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(async (res) => {
          resolve(true);
        })
        .catch((error) => {
          console.error(error);
          reject(error);
        });
    } else if (service == "spotify") {
      await fetch(`${process.env.REACT_APP_API}/api/user/unlinkSpotify`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(async (res) => {
          resolve(true);
        })
        .catch((error) => {
          console.error(error);
          reject(error);
        });
    }
  });
};

export default unlinkMusic;
