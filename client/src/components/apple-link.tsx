/*
  This is a temporary test component for linking to Apple Music API
*/

import styled from "styled-components";
import { userSessionContext } from "../context/userSessionContext";
import fetchUser from "../services/fetch-user";
import setUp from "../services/apple-music-link";
import { useContext } from "react";

const AppleLink = () => {
  const { setUser } = useContext(userSessionContext);

  return (
    <div>
      <button
        className="p-2 bg-red-400 rounded-md"
        onClick={async () => {
          // If set up is successful to go home page else go to 404
          await setUp();
          try {
            await setUser(await fetchUser());
          } catch (error) {
            console.error(error);
          }
        }}
      >
        Authorize Apple Music
      </button>
    </div>
  );
};

export default AppleLink;
