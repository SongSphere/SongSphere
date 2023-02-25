import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Router from "./components/router";
import { useEffect, useState } from "react";
import { isLoggedInContext } from "./context/isLoggedInContext";
import checkLoggedIn from "./services/check-logged-in";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoggedInHandler = async () => {
      setIsLoggedIn(await checkLoggedIn());
    };
    checkLoggedInHandler();
  }, []);

  return (
    <>
      <isLoggedInContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
        <GoogleOAuthProvider
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID || ""}
        >
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </GoogleOAuthProvider>
      </isLoggedInContext.Provider>
    </>
  );
};

export default App;
