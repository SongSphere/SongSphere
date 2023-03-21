import { CredentialResponse } from "@react-oauth/google";
import { TUserWrapper } from "../../types/user";

const handleSignInUp = async (credentialResponse: CredentialResponse) => {
  let loggedInSuccess = false;
  let user = null;
  let existingAccount = true;

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
      existingAccount = (data as TUserWrapper).existingAccount;
    })
    .catch((error) => {
      throw error;
    });

  return [loggedInSuccess, existingAccount];
};

export default handleSignInUp;
