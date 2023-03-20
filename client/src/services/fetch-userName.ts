import { TUser, TUserWrapper } from "../types/user";

const fetchUserName = async (username: string) => {
  let user = null;
  console.log(`Passed in the text box ${username}`);
  await fetch(`${process.env.REACT_APP_API}/api/user/queryUsername`, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify({
      username: username,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(async (res) => {
      return res.json();
    })
    .then((data) => {
      user = data.users as TUser;
    })
    .catch((error) => {
      throw error;
    });

  return user;
};

export default fetchUserName;
