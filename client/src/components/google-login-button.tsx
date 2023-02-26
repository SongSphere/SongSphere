import { GoogleLogin } from "@react-oauth/google";
import { useContext } from "react";
import { userSessionContext } from "../context/userSessionContext";

// import services
import handleSignInUp from "../services/handle-sign-in-up";
import fetchUser from "../services/fetch-user";
import { useNavigate } from "react-router-dom";

const LoginButton = () => {
  // you can use the isLoggedIn with useContext to see if the user is signed in
  const {
    isLoggedIn,
    setIsLoggedIn,
    user,
    setUser,
    existingAccount,
    setExistingAccount,
  } = useContext(userSessionContext);

  let navigate = useNavigate();

  const handleNavigationToOnboard = () => {
    navigate("/onboard");
  };

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
              // login success
              // redirect to home page
              setIsLoggedIn(true);
              setUser(await fetchUser());
              handleNavigationToOnboard();
            }
          } catch (error) {
            // error handling
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
