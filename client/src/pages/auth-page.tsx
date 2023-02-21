/*
  
  Author: David Kim
  this is a page for login/sign up page
*/

import DummyLogin from "../components/google-login-button";

const AuthPage = () => {
  return (
    //  This sets the background and bg-color
    <div className="flex h-screen w-screen place-items-center justify-center bg-background">
      {/* This sets the white rounded rectangle */}
      <div className="flex h-4/5 w-4/5 flex-row rounded-xl bg-white">
        {/* Responsible for logo image design */}
        <div className="relative h-32 w-32 ...">
          <div className="absolute left-0 top-0 h-16 w-16 ...">

            
          </div>
        </div>
        {/* flex box responsible wrapping for header, light text, and button */}
        <div className="flex w-1/2 flex-col justify-center text-center">
          <div className="text-4xl font-bold justify-center">Welcome back </div>
          <div className="text-center font-light pr-20">
            Continue With Google
          </div>
          <div className="pr-14">
            <button className="w-fit pt-6 px-8">
              <DummyLogin />
            </button>
          </div>
        </div>
        {/* This is the gradient in the right side of the rounded rectangle */}
        <div className="w-1/2 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500"></div>
      </div>
    </div>
  );
};

export default AuthPage;
