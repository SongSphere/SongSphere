import React, { Dispatch } from "react";
import { CredentialResponse } from "@react-oauth/google";
import { TUser, TUserWrapper } from "../context/userSessionContext";

const handleSignInUp = async (credentialResponse: CredentialResponse) => {
  let loggedInSuccess = false;
  let user = null;

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
      if (res.status != 201) {
        throw new Error("login fail");
      }
      loggedInSuccess = true;
      return res.json();
    })
    .then((data) => {
      user = (data as TUserWrapper).user;
    })
    .catch((error) => {
      throw error;
    });

  return loggedInSuccess;
};

export default handleSignInUp;
