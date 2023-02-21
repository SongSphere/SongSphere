import React from "react";
import DummyLogin from "./components/dummy-login";
import SideBar from "./components/size-bar";
import AuthPage from "./pages/auth-page";


function App() {
  return (
    <div>
       {/* <SideBar/> */}
       <AuthPage/>
    </div>
    // <div>
    //   <p>default starting component</p>
    //   <DummyLogin />
    // </div>
  );
}

export default App;
