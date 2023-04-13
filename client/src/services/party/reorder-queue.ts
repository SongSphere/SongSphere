import { TMusicContent } from "../../types/music-content";

const reorderQueue = async (index: number, direction: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      await fetch(`${process.env.REACT_APP_API}/api/reorderqueue`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({
          index: index,
          dir: direction,
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

export default reorderQueue;
