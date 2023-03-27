const handleSignout = async (): Promise<boolean> => {
  return new Promise<boolean>(async (resolve, reject) => {
    await fetch(`${process.env.REACT_APP_API}/api/auth/signout`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      
    }).then(async (res) => {
      resolve(true)
    }).catch((error) => {
      resolve(false)
    }) ;
  })
};

export default handleSignout;
