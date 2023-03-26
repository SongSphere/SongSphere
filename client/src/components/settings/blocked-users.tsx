import { useState } from "react";
import styled from "styled-components";
import BlockedList from "./blocked-list";

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

interface IBlocked {
  blocked: string[];
}

const BlockedUsers = (props: IBlocked) => {
  const [openBlockedUsers, setOpenBlockedUsers] = useState(false);

  const handleClick = () => {
    setOpenBlockedUsers(!openBlockedUsers);
  };

  return (
    <div>
      <Button onClick={async () => handleClick()}>View blocked accounts</Button>

      {openBlockedUsers ? (
        <div>
          <BlockedList blockedUsers={props.blocked} />
        </div>
      ) : null}
    </div>
  );
};

export default BlockedUsers;
