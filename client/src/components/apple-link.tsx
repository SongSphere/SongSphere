/*
  This is a temporary test component for linking to Apple Music API
*/

import styled from "styled-components";
import { userSessionContext } from "../context/userSessionContext";
import fetchUser from "../services/fetch-user";
import setUp from "../services/apple-music-link";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const Button = styled.button`
  background-color: red
  color: red;
  padding: 5px 15px;
  border-radius: 5px;
  outline: 0;
  text-transform: uppercase;
  margin: 10px 0px;
  cursor: pointer;
  box-shadow: 0px 2px 2px lightgray;
  transition: ease background-color 250ms;
  &:hover {
    background-color: red
  }
  &:disabled {
    cursor: default;
    opacity: 0.7;
  }
`;

const AppleLink = () => {
  const { isLoggedIn, setIsLoggedIn, user, setUser } =
    useContext(userSessionContext);


    let navigate = useNavigate();

   
    const handleNavigationToHomePage = () => {
      navigate("/");
    };

    const handleNavigationTo404 = () => {
      navigate("/sdfasd");
    };

  return (
    <div>
      <Button
        onClick={async () => {
          // If set up is successful to go home page else go to 404
          await setUp(); //? handleNavigationToHomePage() : handleNavigationTo404() ;
          try {
            await setUser(await fetchUser());
         

          } catch (error) {
            console.error(error);
          }
        }}
      >
        Authorize Apple Music
      </Button>
    </div>
  );
};

export default AppleLink;
