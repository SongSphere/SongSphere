export const processFollowRequest = async (
  id: string,
  action: boolean,
  username: string,
  requester: string
) => {
  return new Promise((resolve, reject) => {
    fetch(`${process.env.REACT_APP_API}/api/followRequest`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        action: action,
        username: username,
        requester: requester,
        id: id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        resolve(true);
      })
      .catch((error) => {
        reject(false);
      });
  });
};
