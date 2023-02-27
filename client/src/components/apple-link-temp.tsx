/*
  This is a temporary test component for linking to Apple Music API
*/

import styled from "styled-components";
import { userSessionContext } from "../context/userSessionContext";
import fetchUser from "../services/fetch-user";
import { appleAuth } from "../services/apple-music-link";
import { useContext } from "react";
import { appleMusicContext } from "../context/appleMusicContext";

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

  const { musicInstance } = useContext(appleMusicContext);

  return (
    <div>
      <Button
        onClick={async () => {
          try {
            if (musicInstance) {
              await appleAuth(musicInstance);
            } else {
              throw new Error("musickit not config");
            }
          } catch (error) {
            console.error(error);
          }
          // console.log(appleMusicInstance);
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
