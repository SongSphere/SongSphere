import { GoogleLogin } from "@react-oauth/google";
import handleSignInUp from "../services/handle-sign-in-up";
import fetchUser from "../services/fetch-user";
import { useNavigate } from "react-router-dom";
import { TUser } from "../types/user";

interface ILoginButtonProps {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setUser: React.Dispatch<React.SetStateAction<TUser | null>>;
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
                props.setUser(user);
                if (user) {
                  if (
                    !existing ||
                    (user.appleToken == null && user.spotifyToken == null)
                  ) {
                    navigate("/onboard");
                  }
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
