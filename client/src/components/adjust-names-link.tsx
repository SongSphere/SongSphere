import styled from "styled-components";
import { userSessionContext } from "../context/userSessionContext";
import fetchUser from "../services/fetch-user";
import { useContext, useState } from "react";
import AdjustName from "../services/adjust-name";
import Popup from "reactjs-popup";

/*
 * This is used in the settings page to modify username, givenName, middleName, and Family_name
 * Author: David Kim
 */

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

// This argument is filled out in settings-page
type names = {
  username: string;
  givenName: string;
  middleName: string;
  familyName: string;
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
          // Open Modal that prints Success
          setOpen(true);

          await AdjustName(
            props.username,
            props.givenName,
            props.middleName,
            props.familyName
          );

          // Update the user fields with the updated fields
          try {
            await setUser(await fetchUser());
          } catch (error) {
            console.error(error);
          }
        }}
      >
        Update Names
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