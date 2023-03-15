/*
    Author: David
    This helps communicate with backend for the private account 
*/ 

const setVisibilityPrivate = async (email: string | undefined) => {
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
      return res.json();
    })
    .catch((error) => {
      console.error(error);
    });
};

export default setVisibilityPrivate;
