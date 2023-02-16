/*
  this is a dummy component for google login
*/

import React from "react";
import { GoogleLogin } from "@react-oauth/google";

// import services
import handleLogin from "../services/handle-login";
import testLogin from "../services/test-login";
import handleSignout from "../services/handle-signout";

const DummyLogin = () => {
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
      <button onClick={() => testLogin()} className="bg-blue-300">
        test login
      </button>
      <button onClick={() => handleSignout()} className="bg-violet-300">
        logout
      </button>
    </div>
  );
};

export default DummyLogin;
