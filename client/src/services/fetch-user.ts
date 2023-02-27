import { TUser, TUserWrapper } from "../context/userSessionContext";

const fetchUser = async () => {
  let user = null;
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
      user = (data as TUserWrapper).user;
    })
    .catch((error) => {
      console.log("asdfasd")
      throw error;
    });
  return user;
};

export default fetchUser;
