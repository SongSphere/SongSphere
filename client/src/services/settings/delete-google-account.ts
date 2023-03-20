/*
    Author: David Kim
    This is a service for Deleting a document associated with google email
    @returns Promise<Boolean>
*/

const DeleteGoogleAccount = async (email: string) => {
    try {
        await fetch(`${process.env.REACT_APP_API}/user/deleteAccount`, {
          method: "POST",
          credentials: "include",
          body: JSON.stringify({
            email: email,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        return true;
        
      } catch (err) {
        console.log(err);
        return false;
      }

}

export default DeleteGoogleAccount;