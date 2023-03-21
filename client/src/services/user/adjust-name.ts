const AdjustName = async (
  username: string,
  givenName: string,
  middleName: string,
  familyName: string
): Promise<boolean> => {
  return new Promise<boolean>(async (resolve, reject) => {
    try {
      await fetch(`${process.env.REACT_APP_API}/api/user/adjustNames`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({
          username: username,
          givenName: givenName,
          middleName: middleName,
          familyName: familyName,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        if (res.status == 200) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    } catch (err) {
      resolve(false);
      reject(err);
    }
  });
};

export default AdjustName;
