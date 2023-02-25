import { GoogleLogin } from "@react-oauth/google";
import { useContext } from "react";
import { userSessionContext } from "../context/userSessionContext";

// import services
import handleSignInUp from "../services/handle-sign-in-up";

const LoginButton = () => {
  // you can use the isLoggedIn with useContext to see if the user is signed in
  const { isLoggedIn, setIsLoggedIn, user, setUser } =
    useContext(userSessionContext);

  console.log("isLoggedIn " + isLoggedIn);
  console.log(user);

  return (
    <div>
      <GoogleLogin
        onSuccess={async (credentialResponse) => {
          const [loginSuccess, userData] = await handleSignInUp(
            credentialResponse
          );
          if (loginSuccess) {
            // login success
            // redirect to home page
            setIsLoggedIn(true);
            setUser(userData);
          }
          // login failed
        }}
        onError={() => {
          console.error("Login Failed");
        }}
      />
    </div>
  );
};

export default LoginButton;
