/*
  This is a button that adjust names
*/

import styled from "styled-components";
import { userSessionContext } from "../context/userSessionContext";
import fetchUser from "../services/fetch-user";
import setUp from "../services/apple-music-link";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdjustName from "../services/adjust-name";
import Popup from 'reactjs-popup';

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

type names = {
    username: string,
    givenName: string,
    middleName: string,
    familyName: string,

};

const AdjustNamesLink = (props: names) => {
  const { isLoggedIn, setIsLoggedIn, user, setUser } =
    useContext(userSessionContext);

  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);


  return (
    <div>
      <Button
        onClick={async () => {
          // If set up is successful to go home page else go to 404
          console.log("before ran")
          console.log(props.givenName)
          setOpen(true)
  
          await AdjustName(props.username, props.givenName, props.middleName, props.familyName); //? handleNavigationToHomePage() : handleNavigationTo404() ;
          
          console.log("ran")
          console.log("Ran adjust names")

          try {
            await setUser(await fetchUser());
            console.log("IN fetch")
          } catch (error) {

            console.error(error);
          }
        }}
      >
        Done with Names
      </Button>
      <Popup open={open} closeOnDocumentClick onClose={closeModal}>
            <div className="modal">
              <a className="close" onClick={closeModal}>
                &times;
              </a>
              Success
            </div>
          </Popup>
    </div>
  );
};

export default AdjustNamesLink;


