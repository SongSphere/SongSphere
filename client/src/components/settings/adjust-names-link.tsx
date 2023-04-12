import styled from "styled-components";
import fetchUser from "../../services/user/fetch-user";
import { useState } from "react";
import AdjustName from "../../services/user/adjust-name";
import Popup from "reactjs-popup";
import Session from "../../session";
import FailPopUp from "../popup/fail-popup";

/*
 * This is used in the settings page to modify username, givenName, middleName, and Family_name
 * Author: David Kim
 */

interface IAdjustNamesLinkProps {
  username: string;
  givenName: string;
  middleName: string;
  familyName: string;
}

const AdjustNamesLink = (props: IAdjustNamesLinkProps) => {
  const [nameFailOpen, setNameFailOpen] = useState(false);
  const SET_NAME_ERR_MSG =
    "Oops! Your name is not sucessfully updated. Try again later";

  return (
    <div>
      <button
        className="p-2 rounded-lg bg-slate-300"
        onClick={async () => {
          await AdjustName(
            props.username,
            props.givenName,
            props.middleName,
            props.familyName
          )
            .then(async (res) => {
              if (!res) {
                setNameFailOpen(true);
              }
              await Session.setUser(await fetchUser());
            })
            .catch((err) => {
              setNameFailOpen(true);
              console.error(err);
            });
        }}
      >
        Update Names
      </button>

      <FailPopUp
        open={nameFailOpen}
        setOpen={setNameFailOpen}
        failText={SET_NAME_ERR_MSG}
      />
    </div>
  );
};

export default AdjustNamesLink;
