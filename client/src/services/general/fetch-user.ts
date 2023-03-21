import { TUser, TUserWrapper } from "../../types/user";

const fetchUser = async () => {
  return new Promise<TUser | null>(async (resolve, reject) => {
    await fetch(`${process.env.REACT_APP_API}/user`, {
      method: "get",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (res) => {
        return res.json();
      })
      .then((data) => {
        const user = (data as TUserWrapper).user;
        resolve(user);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export default fetchUser;
