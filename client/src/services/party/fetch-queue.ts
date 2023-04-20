import { TMusicContent } from "../../types/music-content";
import { TPartyRoom } from "../../types/party-room";

interface IQueue {
  queue: TMusicContent[];
  index: number;
}

const fetchQueue = async (id: string) => {
  return new Promise<IQueue>(async (resolve, reject) => {
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
        resolve({
          queue: room.queue,
          index: room.musicIndex,
        });
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export default fetchQueue;
