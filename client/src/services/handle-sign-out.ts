const handleSignout = async () => {
  await fetch(`${process.env.REACT_APP_API}/api/auth/signout`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(async (res) => {
    // do things after signout
  });
};

export default handleSignout;
