/*
  this is a dummy component for google login
*/

import React from "react";
import { GoogleLogin } from "@react-oauth/google";

// import services
import handleLogin from "../services/handle-login";
import testLogin from "../services/test-login";

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
    </div>
  );
};

export default DummyLogin;
