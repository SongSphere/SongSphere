/*
  
  Author: David Kim
  this is a page for login/sign up page
*/

import DummyLogin from "../components/google-login-button";

const AuthPage = () => {
  return (
    //  This sets the background and bg-color
    <div
      className="
                    flex h-screen w-screen place-items-center justify-center bg-background  
                    "
    >
      {/* This sets the white rounded rectangle */}
      <div
        className="
                      flex h-4/5 w-4/5 flex-row rounded-xl bg-white
                      "
      >
        {/* Responsible for logo image design */}
        <div
          className="relative h-32 w-32 rounded-xl"
        >
          <div
            className="
              absolute left-0 top-0 h-64 w-64 rounded-xl
              lg:h-64
              md:h-60 md:w-60
              sm:h-40 sm:w-40"
          >
            <img src="/img/SongSphere.png"></img>
          </div>
        </div>
        {/* flex box responsible wrapping for header, light text, and button */}
        <div
          className="
                        flex justify-center text-center first-letter
                        sm:w-1/2 sm:flex-col
                        md:w-1/2 md:flex-col md:justify-center md:first-letter
                        "
        >
          <div
            className="
                          text-sm font-light justify-center
                          lg:text-4xl lg:font-bold lg:justify-center
                          md:text-lg md:font-bold md:justify-center md:pr-16 
                          sm:text-sm sm:font-light sm:justify-center"
          >
            Welcome back{" "}
          </div>
          <div
            className="
                          text-center font-light pr-8
                          lg:pr-36
                          md:pr-8"
          >
            Continue With Google
          </div>
          <div
            className="
                          lg:pr-16"
          >
            <button
              className="lg:w-fit lg:pt-6 lg:justify-center 
                         md:w-fit md:pt-6 md:px-6"
            >
              <DummyLogin />
            </button>
            {/* <button className="
                               w-fit pt-6 px-6 justify-center
                               md:w-fit md:pt-6 md:px-6
                               lg:w-fit lg:pt-6 lg:justify-center "
                               >
              <DummyLogin />
            </button> */}
          </div>
        </div>
        {/* This is the gradient in the right side of the rounded rectangle */}
        <div
          className="hidden sm:block
                     lg:w-1/2 lg:rounded-xl lg:bg-gradient-to-r from-violet-500 to-fuchsia-500
                        md:w-3/4"
        ></div>
      </div>
    </div>
  );
};

export default AuthPage;
