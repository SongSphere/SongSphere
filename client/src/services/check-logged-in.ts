const checkLoggedIn = async () => {
  let isLoggedIn = false;
  await fetch(`${process.env.REACT_APP_API}/api/testauth`, {
    method: "get",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(async (res) => {
    if (res.status == 200) {
      isLoggedIn = true;
    }
  });
  return isLoggedIn;
};

export default checkLoggedIn;
