/*
    Author: David
    This helps communicate with backend for the public account 
*/

const SetVisibilityPublic = async (email: string | undefined) => {
  return new Promise<Boolean>(async (resolve, reject) => {
    await fetch(`${process.env.REACT_APP_API}/api/user/visibility`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        isPrivate: false,
      }),
    })
      .then(async (res) => {
        resolve(true)
      })
      .catch((error) => {
        reject(false)
      });
  })
};

export default SetVisibilityPublic;
