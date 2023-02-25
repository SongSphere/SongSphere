import { GoogleLogin } from "@react-oauth/google";
import { useContext } from "react";
import { isLoggedInContext } from "../context/isLoggedInContext";

// import services
import handleSignInUp from "../services/handle-sign-in-up";

const LoginButton = () => {
  // you can use the isLoggedIn with useContext to see if the user is signed in
  const { isLoggedIn, setIsLoggedIn } = useContext(isLoggedInContext);
  console.log("originally: " + isLoggedIn);
  return (
    <div>
      <GoogleLogin
        onSuccess={async (credentialResponse) => {
          const loginSuccess = await handleSignInUp(credentialResponse);
          console.log("logging in");
          console.log(loginSuccess);
          if (loginSuccess) {
            // login success
            // redirect to home page
            setIsLoggedIn(true);
            console.log("after: " + isLoggedIn);
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
