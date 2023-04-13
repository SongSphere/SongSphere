const DeleteGoogleAccount = async (email: string) => {
  return new Promise<boolean>(async (resolve, reject) => {
    await fetch(`${process.env.REACT_APP_API}/api/user/deleteAccount`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        email: email,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        resolve(true);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export default DeleteGoogleAccount;
