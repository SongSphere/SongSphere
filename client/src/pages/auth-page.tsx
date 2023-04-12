import LoginButton from "../components/onboard/google-login-button";
import { TUser } from "../types/user";
import Session from "../session";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface IAuthPageProps {}

const AuthPage = (props: IAuthPageProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = Session.getUser();
    console.log("debug", user);
    if (user != null) {
      navigate("/");
    }
  }, []);

  return (
    <div className="flex justify-center w-screen h-screen bg-background place-items-center">
      <div className="flex flex-row w-4/5 bg-white h-4/5 rounded-xl">
        <div className="w-full p-4 sm:w-1/2">
          <div className="w-40 h-40">
            <img src="/img/SongSphere.png"></img>
          </div>
          <div className="flex flex-col justify-start pt-20 text-start">
            <div className="">Welcome back</div>
            <div>Continue with Google</div>
            <div>
              <div>
                <LoginButton />
              </div>
            </div>
          </div>
        </div>
        <div className="hidden w-1/2 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 sm:block"></div>
      </div>
    </div>
  );
};

export default AuthPage;
