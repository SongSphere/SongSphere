import React, { Dispatch } from "react";
import { CredentialResponse } from "@react-oauth/google";

const handleLogin = async (credentialResponse: CredentialResponse) => {
  await fetch(`${process.env.REACT_APP_API}/api/auth/google`, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify({
      token: credentialResponse.credential,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then(async (res) => {
    // do things after login
  });
};

export default handleLogin;
