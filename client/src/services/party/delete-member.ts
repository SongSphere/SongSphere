import { resolve } from "path"
import { TPartyRoom } from "../../types/party-room"

const DeleteMember = async (room: TPartyRoom, username: string) => {
    return new Promise<boolean>(async (resolve, reject) => {
      try {
        await fetch(`${process.env.REACT_APP_API}/api/removemember`, {
          method: "POST",
          credentials: "include",
          body: JSON.stringify({
            room: room,
            username: username,
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
        reject(err);
      }
    });
  };
  
  export default DeleteMember;