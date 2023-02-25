/*
  this is a  component for google login
*/

import { GoogleLogin } from "@react-oauth/google";

// import services
import handleLogin from "../services/handle-sign-in-up";

import { useMemo, useState } from "react";
import { IisLoggedInContext } from "../context/isLoggedInContext";

const LoginButton = () => {
  const [isLoggedin, setIsLoggedIn] = useState<boolean>(false);


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
