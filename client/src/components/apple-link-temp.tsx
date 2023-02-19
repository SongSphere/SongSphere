/*
  This is a temporary test component for linking to Apple Music API
*/

import React from "react";

// import services
import { useEffect } from "react";
import styled from "styled-components";
import setUp from "../services/apple-music-link";

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
  return (
    <div>
      <Button onClick={setUp}>Authorize Apple Music</Button>
    </div>
  );
};

export default AppleLink;
