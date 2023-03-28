import styled from "styled-components";
import { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import { useNavigate } from "react-router-dom";
import DeleteGoogleAccount from "../../services/user/delete-google-account";
import Session from "../../session";

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

interface IDeleteGoogleAcountLinkProps {}

const DeleteGoogleAcountLink = (props: IDeleteGoogleAcountLinkProps) => {
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const [email, setEmail] = useState<string>("");

  let navigate = useNavigate();

  useEffect(() => {
    const user = Session.getUser();
    if (user) {
      setEmail(user.email);
    }
  }, [Session.getUser()]);

  return (
    <div>
      <Button
        onClick={async () => {
          // Open Modal that prints Success
          setOpen(true);
          DeleteGoogleAccount(email);

          // Update the user fields with the updated fields
          try {
            Session.setUser(null);
            Session.setIsLoggedIn(false);
            navigate("/auth");
          } catch (error) {
            console.error(error);
          }
        }}
      >
        Delete account
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

export default DeleteGoogleAcountLink;
