import { TUser } from "../../types/user";

const fetchUserNames = async (username: string) => {
  let user = null;
  console.log(`Passed in the text box ${username}`);
  await fetch(`${process.env.REACT_APP_API}/api/user/queryUsernames`, {
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

export default fetchUserNames;
