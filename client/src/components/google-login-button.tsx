import { GoogleLogin } from "@react-oauth/google";
import { useContext, useEffect } from "react";
import { TUser, userSessionContext } from "../context/userSessionContext";

// import services
import handleSignInUp from "../services/handle-sign-in-up";
import fetchUser from "../services/fetch-user";
import { useNavigate } from "react-router-dom";

const LoginButton = () => {
  const { setIsLoggedIn, setUser, setExistingAccount } =
    useContext(userSessionContext);
  let navigate = useNavigate();

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
              await fetchUser().then((user: TUser | null) => {
                setUser(user);
                if (user) {
                  console.log(user);

                  if (
                    !existing ||
                    (user.appleToken == null && user.spotifyToken == null)
                  ) {
                    navigate("/onboard");
                  }
                  window.location.reload();
                }
                navigate("/");
              });
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
