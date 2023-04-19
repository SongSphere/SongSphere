import { TPartyRoom } from "../../types/party-room"
import { TChat } from "../../types/chat";

const fetchChatsById = async(id: string) => {
    return new Promise<TChat[]> (async(resolve, reject) => {
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
              resolve(room.chats);
            })
            .catch((error) => {
                console.log(error);
              reject(error);
            });
    });
};
export default fetchChatsById;