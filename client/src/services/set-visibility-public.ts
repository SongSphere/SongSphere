/*
    Author: David
    This helps communicate with backend for the public account 
*/

const SetVisibilityPublic = async (email: string | undefined) => {
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
      return res.json();
    })
    .catch((error) => {
      console.error(error);
    });
};

export default SetVisibilityPublic;
