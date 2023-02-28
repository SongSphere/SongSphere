export const followSomeone = async () => {
  await fetch(`${process.env.REACT_APP_API}/api/addfollower`, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify({
      emailOfUserGettingFollowed: "dominicdanborncollege@gmail.com",
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then(async (res) => {
    if (res.status != 201) {
      console.error(res);
      return false;
    }
    console.log(res.json());
    return true;
  });
};

export const unfollowSomeone = async () => {
  await fetch(`${process.env.REACT_APP_API}/api/removefollower`, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify({
      emailOfUserGettingUnfollowed: "dominicdanborncollege@gmail.com",
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then(async (res) => {
    if (res.status != 201) {
      console.error(res);
      return false;
    }
    console.log(res.json());
    return true;
  });
};
