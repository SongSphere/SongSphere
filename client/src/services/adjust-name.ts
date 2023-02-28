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


      
      return true;
      
    } catch (err) {

      return false;
    }
  };
  
  export default AdjustName;
  