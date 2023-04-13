import { TMusicContent } from "../../types/music-content";

const addQueue = async (song: TMusicContent) => {
  return new Promise(async (resolve, reject) => {
    try {
      await fetch(`${process.env.REACT_APP_API}/api/addqueue`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({
          song: song,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        if (res.status == 201) {
          resolve(true);
        } else reject(false);
      });
    } catch (err) {
      console.error(err);
      reject(false);
    }
  });
};

export default addQueue;
