import { TPartyRoom } from "../../types/party-room"
import { TChat } from "../../types/chat";

const fetchListeners = async(id: string) => {
    return new Promise<string[]> (async(resolve, reject) => {
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
              resolve(room.members);
            })
            .catch((error) => {
                console.log(error);
              reject(error);
            });
    });
};
export default fetchListeners;