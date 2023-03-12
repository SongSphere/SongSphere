import { TUser, TUserWrapper } from "../../types/user";

const fetchUserByUsername = async (username: string) => {
  return new Promise<TUser>(async (resolve, reject) => {
    await fetch(`${process.env.REACT_APP_API}/api/user/${username}`, {
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
        const user = data.user as TUser;
        resolve(user);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export default fetchUserByUsername;
