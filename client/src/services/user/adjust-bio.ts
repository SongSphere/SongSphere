const adjustBio = async (bio: string): Promise<boolean> => {
  return new Promise<boolean>(async (resolve, reject) => {
    try {
      await fetch(`${process.env.REACT_APP_API}/api/user/updateBio`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({
          bio: bio,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        if (res.status == 200) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    } catch (err) {
      resolve(false);
      reject(err);
    }
  });
};

export default adjustBio;
