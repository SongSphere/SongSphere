import { TUser } from "../../types/user";

const fetchActiveListeningUsers = async () => {
  return new Promise<{ user: TUser; song: string }[]>(
    async (resolve, reject) => {
      await fetch(`${process.env.REACT_APP_API}/api/activelistening`, {
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
          resolve(data.posts);
        })
        .catch((error) => {
          reject(error);
        });
    }
  );
};

export default fetchActiveListeningUsers;
