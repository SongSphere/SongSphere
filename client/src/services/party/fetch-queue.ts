import { TMusicContent } from "../../types/music-content";
import { TPartyRoom } from "../../types/party-room";

const fetchQueue = async (id: string) => {
  return new Promise<TMusicContent[]>(async (resolve, reject) => {
    await fetch(`${process.env.REACT_APP_API}/api/room/${id}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (res) => {
        return res.json();
      })
      .then((data) => {
        const room = data.room as TPartyRoom;
        resolve(room.queue);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export default fetchQueue;
