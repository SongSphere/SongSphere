import { GoogleLogin } from "@react-oauth/google";
import { useContext, useEffect } from "react";
import { userSessionContext } from "../context/userSessionContext";

// import services
import handleSignInUp from "../services/handle-sign-in-up";
import fetchUser from "../services/fetch-user";
import { useNavigate } from "react-router-dom";

const LoginButton = () => {
  // you can use the isLoggedIn with useContext to see if the user is signed in
  const { user, setIsLoggedIn, setUser, existingAccount, setExistingAccount } =
    useContext(userSessionContext);
  let navigate = useNavigate();

  // useEffect(() => {
  //   if (
  //     !existingAccount ||
  //     (user?.appleToken == null && user?.spotifyToken == null)
  //   ) {
  //     console.log("onboarding is needed");
  //     console.log(user);
  //     // navigate("/onboard");
  //   }
  //   navigate("/");
  // }, [user]);

  return (
    <div>
      <GoogleLogin
        onSuccess={async (credentialResponse) => {
          try {
            const [loginSuccess, existing] = await handleSignInUp(
              credentialResponse
            );

            setExistingAccount(existing);

            if (loginSuccess) {
              setIsLoggedIn(true);
              await setUser(await fetchUser());
            } else {
              throw new Error("login not sucess");
            }
          } catch (error) {
            navigate("/auth");
          }
        }}
        onError={() => {
          console.error("Login Failed");
        }}
      />
    </div>
  );
};

export default LoginButton;
