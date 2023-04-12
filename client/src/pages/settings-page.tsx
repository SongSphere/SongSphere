/*
  
  Author: David Kim
  this is a page for settings page
  Contains modal, Calls Adjust Names Link to update toward DB
*/

import { useEffect, useState } from "react";
import AdjustNamesLink from "../components/settings/adjust-names-link";
import DeleteGoogleAcountLink from "../components/settings/delete-google-account-link";
import { TUser } from "../types/user";
import {
  BackgroundImgCropper,
  ProfileImgCropper,
} from "../components/settings/image-handler";
import Navbar from "../components/navbar";
import AppleLink from "../components/settings/apple-link";
import SpotifyLinkButton from "../components/settings/spotify-link";
import unlinkMusic from "../services/user/unlink-music";
import DefaultPlatform from "../components/settings/set-default-platform";
import fetchUser from "../services/user/fetch-user";
import Session from "../session";
import setVisibilityPublic from "../services/settings/set-visibility-public";
import setVisibilityPrivate from "../services/settings/set-visibility-private";
import setFalseRandomSong from "../services/settings/set-false-random-song";
import setTrueRandomSong from "../services/settings/set-true-random-song";
import BlockedList from "../components/settings/blocked-list";
import setShowSong from "../services/settings/set-show-song";

const SettingsPage = () => {
  const [showBlockModal, setShowBlockModal] = useState(false);
  const [user, setUser] = useState<TUser | null>(null);
  const [username, setUsername] = useState<string>("");
  const [givenName, setGivenName] = useState<string>("");
  const [middleName, setMiddleName] = useState<string>("");
  const [familyName, setFamilyName] = useState<string>("");
  const [profileImgUrl, setProfileImgUrl] = useState<string>("");
  const [backgroundImgUrl, setBackgroundImgUrl] = useState<string>("");

  const [isPrivateStatus, setIsPrivateStatus] = useState<boolean>(false);
  const [isRandomStatus, setIsRandomStatus] = useState<boolean>(false);

  const [shareCurrentSong, setShareCurrentSong] = useState<boolean>(false);

  const [appleAccountStatus, setAppleAccountStatus] = useState<boolean>(false);
  const [spotifyAccountStatus, setSpotifyAccountStatus] =
    useState<boolean>(false);
  const [defaultPlatform, setDefaultPlatform] = useState<string>("");

  const handleBlockOpen = () => {
    setShowBlockModal(true);
  };
  const handleBlockClose = () => {
    setShowBlockModal(false);
  };

  useEffect(() => {
    setUser(Session.getUser());
  }, [Session.getUser()]);

  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setGivenName(user.givenName);
      setMiddleName(user.middleName);
      setFamilyName(user.familyName);
      if (user.appleToken != undefined) {
        setAppleAccountStatus(true);
      } else {
        setAppleAccountStatus(false);
      }
      if (user.spotifyToken != undefined) {
        setSpotifyAccountStatus(true);
      } else {
        setSpotifyAccountStatus(false);
      }
      if (user.isPrivate == false) {
        setIsPrivateStatus(false);
      } else {
        setIsPrivateStatus(true);
      }
      setBackgroundImgUrl(user.backgroundImgUrl);
      setProfileImgUrl(user.profileImgUrl);
      setDefaultPlatform(user.defaultPlatform);
      if (user.showRandomSong == false) {
        setIsRandomStatus(false);
      } else {
        setIsRandomStatus(true);
      }
      if (user.showPlayingSong == true) {
        setShareCurrentSong(true);
      } else {
        setShareCurrentSong(false);
      }
    }
  }, [user]);

  if (!user) {
    return <div>fetching user data</div>;
  }
  function setPostSuccessFail(arg0: JSX.Element) {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="">
      <Navbar />
      <div className="grid h-screen grid-cols-3 bg-lblue text-navy ">
        <div className="justify-center w-full p-10 mt-5 ml-5 bg-white rounded-md h-5/6 sm:w-3/4 sm:px-6 drop-shadow-md">
          <h3 className="mb-5 text-3xl font-semibold text-center text-gray-900 border-b-4 border-solid border-b-lgrey">
            Profile Settings
          </h3>
          <div>
            <div>
              Username:
              <input
                className="ml-2 border-b-2 e-input border-b-lgrey"
                type="text"
                placeholder="Enter User Name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              First name:
              <input
                className="ml-2 border-b-2 e-input border-b-lgrey"
                type="text"
                placeholder="Enter Given Name"
                value={givenName}
                onChange={(e) => setGivenName(e.target.value)}
              />
            </div>
            <div>
              Middle Name:
              <input
                className="ml-2 border-b-2 e-input border-b-lgrey"
                type="text"
                placeholder="Enter Middle Name"
                value={middleName}
                onChange={(e) => setMiddleName(e.target.value)}
              />
            </div>
            <div>
              Last Name:
              <input
                className="ml-2 border-b-2 e-input border-b-lgrey"
                type="text"
                placeholder="Enter Last Name"
                value={familyName}
                onChange={(e) => setFamilyName(e.target.value)}
              />
            </div>
          </div>
          <AdjustNamesLink
            username={username}
            givenName={givenName}
            middleName={middleName}
            familyName={familyName}
          />
          <DeleteGoogleAcountLink />
          <div>{`Account private: ${isPrivateStatus}`}</div>

          <div className="flex justify-center">
            <div>
              <input
                className="mt-[0.3rem] mr-2 h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 dark:bg-neutral-600 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 dark:after:bg-neutral-400 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary dark:checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary dark:checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s]"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault"
                checked={isPrivateStatus}
                onChange={async () => {
                  if (isPrivateStatus) {
                    // True (that means it is Private account) // False (that means it is Public account)
                    // It is private then call to set it public
                    setVisibilityPublic(user.email)
                      .then(async () => {
                        Session.setUser(await fetchUser());
                        setIsPrivateStatus(false);
                      })
                      .catch((error) => {
                        console.error(error);
                      });
                  } else {
                    // call to set it private
                    setVisibilityPrivate(user.email)
                      .then(async () => {
                        Session.setUser(await fetchUser());
                        setIsPrivateStatus(true);
                      })
                      .catch((error) => {
                        console.error(error);
                      });
                  }
                }}
              />
              <label className="inline-block pl-[0.15rem] hover:cursor-pointer"></label>
            </div>
          </div>

          <div>{`Random Song Feature: ${isRandomStatus}`}</div>

          <div className="flex justify-center">
            <div>
              <input
                className="mt-[0.3rem] mr-2 h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 dark:bg-neutral-600 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 dark:after:bg-neutral-400 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary dark:checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary dark:checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s]"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault"
                checked={isRandomStatus}
                onChange={async () => {
                  if (isRandomStatus) {
                    // True (that means it is Private account) // False (that means it is Public account)
                    // It is private then call to set it public
                    setFalseRandomSong(user.email)
                      .then(async () => {
                        Session.setUser(await fetchUser());
                        setIsRandomStatus(false);
                      })
                      .catch((error) => {
                        console.error(error);
                      });
                  } else {
                    // call to set it private
                    setTrueRandomSong(user.email)
                      .then(async () => {
                        Session.setUser(await fetchUser());
                        setIsRandomStatus(true);
                      })
                      .catch((error) => {
                        console.error(error);
                      });
                  }
                }}
              />
              <label className="inline-block pl-[0.15rem] hover:cursor-pointer"></label>
            </div>
          </div>

          <div>{`Display Currently Playing Song?: ${shareCurrentSong}`}</div>

          <div className="flex justify-center">
            <div>
              <input
                className="mt-[0.3rem] mr-2 h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 dark:bg-neutral-600 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 dark:after:bg-neutral-400 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary dark:checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary dark:checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s]"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault"
                checked={shareCurrentSong}
                onChange={async () => {
                  if (shareCurrentSong) {
                    setShowSong(false)
                      .then(async () => {
                        Session.setUser(await fetchUser());
                        setShareCurrentSong(false);
                      })
                      .catch((error) => {
                        console.error(error);
                      });
                  } else {
                    setShowSong(true)
                      .then(async () => {
                        Session.setUser(await fetchUser());
                        setShareCurrentSong(true);
                      })
                      .catch((error) => {
                        console.error(error);
                      });
                  }
                }}
              />
              <label className="inline-block pl-[0.15rem] hover:cursor-pointer"></label>
            </div>
          </div>
          <button
            className="p-2 rounded-lg bg-slate-300"
            onClick={handleBlockOpen}
          >
            View blocked accounts
          </button>
        </div>

        <div className="justify-center w-full p-10 mt-5 ml-5 bg-white rounded-md h-5/6 sm:w-3/4 sm:px-6 drop-shadow-md">
          <h3 className="mb-5 text-3xl font-semibold text-center text-gray-900 border-b-4 border-solid border-b-lgrey">
            Image Settings
          </h3>
          <BackgroundImgCropper onCropComplete={console.log} />
          {/* 
              <input
                className="e-input"
                type="text"
                placeholder="Enter Background Photo URL"
                value={backgroundImgUrl}
                onChange={(e) => setBackgroundImgUrl(e.target.value)}
              />
              <UpdateBackgroundURL url={backgroundImgUrl} /> */}
          <ProfileImgCropper onCropComplete={console.log} />
        </div>

        <div className="justify-center w-full p-10 mt-5 ml-5 bg-white rounded-md h-5/6 sm:w-3/4 sm:px-6 drop-shadow-md">
          <h3 className="mb-5 text-3xl font-semibold text-center text-gray-900 border-b-4 border-solid border-b-lgrey">
            Music Settings
          </h3>
          <AppleLink />
          <button
            className="p-2 rounded-md bg-amber-300"
            onClick={async () => {
              await unlinkMusic("apple").then(async () => {
                Session.setUser(await fetchUser());
                setUser(Session.getUser());
              });
            }}
          >
            Unlink Apple Music
          </button>
          <div>{`Apple API connected: ${appleAccountStatus}`}</div>
          <SpotifyLinkButton />

          <button
            className="p-2 rounded-md bg-amber-300"
            onClick={async () => {
              await unlinkMusic("spotify").then(async () => {
                Session.setUser(await fetchUser());
                setUser(Session.getUser());
              });
            }}
          >
            Unlink Spotify
          </button>
          <div>{`Spotify API connected: ${spotifyAccountStatus}`}</div>

          <DefaultPlatform />
        </div>
        <BlockedList
          blockedList={user.blockedUsers}
          isVisible={showBlockModal}
          onClose={handleBlockClose}
        />
      </div>
    </div>
  );
};

export default SettingsPage;
