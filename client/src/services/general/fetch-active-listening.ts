import { TMusicContent } from "../../types/music-content";
import { TUser } from "../../types/user";

const fetchActiveListeningUsers = async () => {
  return new Promise<{ user: TUser; song: TMusicContent }[]>(
    async (resolve, reject) => {
      await fetch(`${process.env.REACT_APP_API}/user/activeListening`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(async (res) => {
          return res.json();
        })
        .then(async (data) => {
          resolve(data.activity);
        })
        .catch((error) => {
          reject(error);
        });
    }
  );
};

export default fetchActiveListeningUsers;
