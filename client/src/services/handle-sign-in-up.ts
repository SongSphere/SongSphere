import React, { Dispatch } from "react";
import { CredentialResponse } from "@react-oauth/google";

const handleSignInUp = async (credentialResponse: CredentialResponse) =>  {
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
    if (res.status == 200) {
      // have cookie saved as true and have a hook where it goes to a new page
      console.log("HI");
    }
  });
};

export default handleSignInUp;
