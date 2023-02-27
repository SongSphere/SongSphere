const AdjustName = async (username: string, givenName: string, middleName: string, familyName: string ) => {
    // Call configure() to configure an instance of MusicKit on the Web.
    try {
      await fetch(`${process.env.REACT_APP_API}/user/adjustNames`, {
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
      });
      console.log("Middle name")
      console.log(middleName);
      console.log("Adjust names called in services client")
      return true;
      
    } catch (err) {
      console.log(err);
      return false;
    }
  };
  
  export default AdjustName;
  