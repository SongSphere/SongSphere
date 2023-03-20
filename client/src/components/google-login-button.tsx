import { GoogleLogin } from "@react-oauth/google";

// import services
import handleSignInUp from "../services/handle-sign-in-up";
import fetchUser from "../services/user/fetch-user";
import { useNavigate } from "react-router-dom";
import { TUser } from "../types/user";
import Session from "../session";

interface ILoginButtonProps {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginButton = (props: ILoginButtonProps) => {
  let navigate = useNavigate();

  return (
    <div>
      <GoogleLogin
        onSuccess={async (credentialResponse) => {
          try {
            const [loginSuccess, existing] = await handleSignInUp(
              credentialResponse
            );

            if (loginSuccess) {
              props.setIsLoggedIn(true);
              await fetchUser().then((user: TUser | null) => {
                Session.setUser(user);
                // if (user) {
                //   if (
                //     !existing ||
                //     (user.appleToken == null && user.spotifyToken == null)
                //   ) {
                //     navigate("/onboard");
                //   }
                // }
                // navigate("/");
                window.location.reload();
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
