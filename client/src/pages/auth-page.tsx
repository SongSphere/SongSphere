import LoginButton from "../components/google-login-button";
import { TUser } from "../types/user";

interface IAuthPageProps {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setUser: React.Dispatch<React.SetStateAction<TUser | null>>;
}

const AuthPage = (props: IAuthPageProps) => {
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
                <LoginButton
                  setIsLoggedIn={props.setIsLoggedIn}
                  setUser={props.setUser}
                />
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
