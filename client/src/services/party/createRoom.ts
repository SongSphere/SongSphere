import { resolve } from "path";
import { TPartyRoom } from "../../types/party-room";

const CreateRoom = async (room: TPartyRoom) => {
  return new Promise<boolean>(async (resolve, reject) => {
    try {
      await fetch(`${process.env.REACT_APP_API}/api/makeroom`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({
          room: room,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        resolve(true);
      });
    } catch (err) {
      console.error(err);
      reject(false);
    }
  });
};

export default CreateRoom;
