import { GoogleLogin } from "@react-oauth/google";
import { useContext } from "react";
import { userSessionContext } from "../context/userSessionContext";
import handleSignInUp from "../services/handle-sign-in-up";
import fetchUser from "../services/fetch-user";
import { useNavigate } from "react-router-dom";

/*
  This is a component that allows for google authentication
  Author: Willy
*/

const LoginButton = () => {
  // you can use the isLoggedIn with useContext to see if the user is signed in
  const { setIsLoggedIn, setUser, setExistingAccount } =
    useContext(userSessionContext);
  let navigate = useNavigate();
  return (
    <div>
      <GoogleLogin
        onSuccess={async (credentialResponse) => {
          try {
            const [loginSuccess, existingAccount] = await handleSignInUp(
              credentialResponse
            );
            setExistingAccount(existingAccount);

            if (loginSuccess) {
              setIsLoggedIn(true);
              setUser(await fetchUser());

              /*
            user does exist in the DB
            Then go to the home page
            */
              if (existingAccount) {
                navigate("/");
              } else {
                navigate("/onboard");
              }
            }
          } catch (error) {
            console.error(error);
          }
        }}
        onError={() => {
          console.error("Login Failed");
        }}
      />
    </div>
  );
};

export default LoginButton;
