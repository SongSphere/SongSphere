/*
    Author: David
    This helps communicate with backend for the private account 
*/ 

const setVisibilityPrivate = async (email: string | undefined) => {
  return new Promise<Boolean>(async (resolve, reject) => {
    await fetch(`${process.env.REACT_APP_API}/api/user/visibility`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        isPrivate: true,
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

export default setVisibilityPrivate;
