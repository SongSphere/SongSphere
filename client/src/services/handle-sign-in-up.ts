import React, { Dispatch } from "react";
import { CredentialResponse } from "@react-oauth/google";

const handleSignInUp = async (credentialResponse: CredentialResponse) => {
  let loggedInSuccess = false;
  await fetch(`${process.env.REACT_APP_API}/api/auth/google`, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify({
      token: credentialResponse.credential,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(async (res) => {
      if (res.status == 201) {
        loggedInSuccess = true;
      }
    })
    .catch((error) => {
      console.error(error);
    });

  return loggedInSuccess;
};

export default handleSignInUp;
