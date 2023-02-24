/*
  this is a  component for google login
*/

import { GoogleLogin } from "@react-oauth/google";

// import services
import handleLogin from "../services/handle-sign-in-up";

const LoginButton = () => {
  return (
    <div>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          handleLogin(credentialResponse);
        }}
        onError={() => {
          console.error("Login Failed");
        }}
      />
    </div>
  );
};

export default LoginButton;
