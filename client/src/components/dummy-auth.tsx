/*
  this is a dummy component for google login
*/

import React from "react";
import { GoogleLogin } from "@react-oauth/google";

// import services
import handleSignInUp from "../services/handle-sign-in-up";
import testAuth from "../services/test-auth";
import handleSignOut from "../services/handle-sign-out";

const DummyAuth = () => {
  return (
    <div>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          handleSignInUp(credentialResponse);
        }}
        onError={() => {
          console.error("Login Failed");
        }}
      />
      <button onClick={() => testAuth()} className="bg-blue-300">
        test auth
      </button>
      <button onClick={() => handleSignOut()} className="bg-violet-300">
        logout
      </button>
    </div>
  );
};

export default DummyAuth;
