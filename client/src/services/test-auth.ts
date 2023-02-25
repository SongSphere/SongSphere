const testAuth = async () => {
  await fetch(`${process.env.REACT_APP_API}/api/testauth`, {
    method: "get",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(async (res) => {
    console.log(res);
  });
};

export default testAuth;
