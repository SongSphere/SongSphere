import styled from "styled-components";
import fetchUser from "../services/user/fetch-user";
import { useEffect, useState } from "react";
import AdjustName from "../services/adjust-name";
import Popup from "reactjs-popup";
import { TUser } from "../types/user";
import Session from "../session";

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

interface IAdjustNamesLinkProps {
  appleMusicInstance: MusicKit.MusicKitInstance | null;
  // setUser: React.Dispatch<React.SetStateAction<TUser | null>>;
  userName: string;
  givenName: string;
  middleName: string;
  familyName: string;
}

const AdjustNamesLink = (props: IAdjustNamesLinkProps) => {
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const [successFailText, setSuccessFailText] = useState("");
  // const [user, setUser] = useState<TUser | null>(null);

  // useEffect(() => {
  //   setUser(Session.getUser());
  // }, [Session.getUser()]);

  return (
    <div>
      <Button
        onClick={async () => {
          // Open Modal that prints Success
          setOpen(true);

          await AdjustName(
            props.userName,
            props.givenName,
            props.middleName,
            props.familyName
          )
            .then(async (res) => {
              if (res) {
                setSuccessFailText("Success");
              } else {
                setSuccessFailText("Fail");
              }
              await Session.setUser(await fetchUser());
            })
            .catch((error) => {
              console.log(error);
            });
        }}
      >
        Update Names
      </Button>

      <Popup open={open} closeOnDocumentClick onClose={closeModal}>
        <div className="modal">
          <a className="close" onClick={closeModal}>
            &times;
          </a>
          {successFailText}
        </div>
      </Popup>
    </div>
  );
};

export default AdjustNamesLink;
