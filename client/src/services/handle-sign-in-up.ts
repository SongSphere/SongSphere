import React, { Dispatch } from "react";
import { CredentialResponse } from "@react-oauth/google";
import { TUser } from "../context/userSessionContext";

type TUserWrapper = {
  user: TUser;
};

const handleSignInUp = async (credentialResponse: CredentialResponse) => {
  let loggedInSuccess = false;
  let userData = null;

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
      return res.json();
    })
    .then((data) => {
      userData = (data as TUserWrapper).user;
      console.log(userData);
    })
    .catch((error) => {
      console.error(error);
    });

  return [loggedInSuccess, userData];
};

export default handleSignInUp;
