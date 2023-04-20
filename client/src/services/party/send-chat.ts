import { TPartyRoom } from "../../types/party-room";
import { TChat } from "../../types/chat";
const SendChat = async (
    room: TPartyRoom,
    chat: TChat,
  ) => {
    return new Promise<boolean>(async (resolve, reject) => {
      try {
        await fetch(`${process.env.REACT_APP_API}/api/sendChat`, {
          method: "POST",
          credentials: "include",
          body: JSON.stringify({
            room: room,
            chat: chat,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }).then((res) => {
          if (res.status == 201) {
            resolve(true);
          } else {
            reject(false);
          }
        });
      } catch (err) {
        console.error(err);
        reject(err);
      }
    });
  };
  
  export default SendChat;