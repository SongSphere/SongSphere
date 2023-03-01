export const searchUser = async (q: string) => {
  let users = Array<[String, String]>();

  await fetch(`${process.env.REACT_APP_API}/api/getusersforsearch`, {
    method: "GET",
    credentials: "include",
  })
    .then(async (res) => {
      // passes json to the next handler function
      return res.json();
    })
    .then((data) => {
      users = data;
    });

  let matches = Array<[String, String]>();

  users.forEach((u) => {
    if (u[0].startsWith(q)) {
      matches.push(u);
    }
  });

  console.log(matches);

  return matches;
};
