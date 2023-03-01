/*
  
  Author: David Kim
  this is a page for settings page
  Contains modal, Calls Adjust Names Link to update toward DB
*/

import { useEffect, useState } from "react";
import AdjustNamesLink from "../components/adjust-names-link";
import DeleteGoogleAcountLink from "../components/delete-google-account-link";
import { TUser } from "../types/user";
import Navbar from "../components/navbar";

interface ISettingPageProps {
  user: TUser | null;
  appleMusicInstance: MusicKit.MusicKitInstance | null;
  setUser: React.Dispatch<React.SetStateAction<TUser | null>>;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const SettingsPage = (props: ISettingPageProps) => {
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);

  const [userName, setUserName] = useState<string>("");
  const [givenName, setGivenName] = useState<string>("");
  const [middleName, setMiddleName] = useState<string>("");
  const [familyName, setFamilyName] = useState<string>("");

  const [appleAccountStatus, setAppleAccountStatus] = useState<string>(
    props.user?.appleToken != null ? "true" : "false"
  );
  const [spotifyAccountStatus, setSpotifyAccountStatus] = useState<string>(
    props.user?.spotifyToken != null ? "true" : "false"
  );

  useEffect(() => {
    if (props.user) {
      setUserName(props.user.userName);
      setGivenName(props.user.givenName);
      setMiddleName(props.user.middleName);
      setFamilyName(props.user.familyName);
    }
  }, [props.user]);

  if (!props.user) {
    return <div>fetching user data</div>;
  } else {
    console.log(props.user);

    return (
      <div>
        <Navbar setUser={props.setUser} setIsLoggedIn={props.setIsLoggedIn} />
        <div className="flex flex-wrap items-center mt-20">
          <div className="w-full text-center sm:w-1/2 sm:px-6">
            <h3 className="text-3xl font-semibold text-gray-900">
              Settings for: {props.user?.givenName}
            </h3>
            <div className="mt-6 text-xl leading-9">
              Let's change your profile
            </div>
          </div>

          <div className="w-full p-6 sm:w-1/2">
            <input
              className="e-input"
              type="text"
              placeholder="Enter User Name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <input
              className="e-input"
              type="text"
              placeholder="Enter Given Name"
              value={givenName}
              onChange={(e) => setGivenName(e.target.value)}
            />
            <input
              className="e-input"
              type="text"
              placeholder="Enter Middle Name"
              value={middleName}
              onChange={(e) => setMiddleName(e.target.value)}
            />
            <input
              className="e-input"
              type="text"
              placeholder="Enter Last Name"
              value={familyName}
              onChange={(e) => setFamilyName(e.target.value)}
            />

            <AdjustNamesLink
              appleMusicInstance={props.appleMusicInstance}
              setUser={props.setUser}
              username={userName}
              givenName={givenName}
              middleName={middleName}
              familyName={familyName}
            />

            <DeleteGoogleAcountLink
              user={props.user}
              setUser={props.setUser}
              setIsLoggedIn={props.setIsLoggedIn}
            />

            <div>{`Apple API connected: ${appleAccountStatus}`}</div>

            <div>{`Spotify API connected: ${spotifyAccountStatus}`}</div>

            <button> Next </button>
          </div>
        </div>
      </div>
    );
  }
};

export default SettingsPage;
