import styled from "styled-components";
import { useState } from "react";
import {
  updateProfileURL,
  updateBackgroundURL,
} from "../../services/send-image";

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
  url: string;
}

export const UpdateProfileURL = (props: IAdjustNamesLinkProps) => {
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);

  return (
    <div>
      <Button
        onClick={async () => {
          setOpen(true);
          await updateProfileURL(props.url);
        }}
      >
        Update Profile URL
      </Button>
    </div>
  );
};

export const UpdateBackgroundURL = (props: IAdjustNamesLinkProps) => {
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);

  return (
    <div>
      <Button
        onClick={async () => {
          setOpen(true);
          await updateBackgroundURL(props.url);
        }}
      >
        Update Background URL
      </Button>
    </div>
  );
};
