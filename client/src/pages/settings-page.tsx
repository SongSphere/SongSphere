/*
  
  Author: David Kim
  this is a page for settings page
  Contains modal, Calls Adjust Names Link to update toward DB
*/

import { useEffect, useState } from "react";
import AdjustNamesLink from "../components/adjust-names-link";
import DeleteGoogleAcountLink from "../components/delete-google-account-link";
import { TUser } from "../types/user";
import {
  BackgroundImgCropper,
  ProfileImgCropper,
} from "../components/image-handler";
import Navbar from "../components/navbar";
import AppleLink from "../components/apple-link";
import SpotifyLinkButton from "../components/spotify-link";
import unlinkMusic from "../services/settings/unlink-music";
import fetchUser from "../services/general/fetch-user";
import {
  UpdateBackgroundURL,
  UpdateProfileURL,
} from "../components/image-url-handler";
import SetPrivateLink from "../components/private-visibility-link";
import SetPublicLink from "../components/public-visibility-link";
import setVisibilityPrivate from "../services/settings/set-visibility-private";
import SetVisibilityPublic from "../services/settings/set-visibility-public";
import setVisibilityPublic from "../services/settings/set-visibility-public";

interface ISettingPageProps {
  user: TUser | null;
  appleMusicInstance: MusicKit.MusicKitInstance;
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
  const [profileImgUrl, setProfileImgUrl] = useState<string>("");
  const [backgroundImgUrl, setBackgroundImgUrl] = useState<string>("");

  const [isPrivateStatus, setIsPrivateStatus] = useState<boolean>(false);

  const [appleAccountStatus, setAppleAccountStatus] = useState<boolean>(false);
  const [spotifyAccountStatus, setSpotifyAccountStatus] =
    useState<boolean>(false);

  useEffect(() => {
    if (props.user) {
      setUserName(props.user.username);
      setGivenName(props.user.givenName);
      setMiddleName(props.user.middleName);
      setFamilyName(props.user.familyName);
      if (props.user.appleToken != undefined) {
        setAppleAccountStatus(true);
      } else {
        setAppleAccountStatus(false);
      }
      if (props.user.spotifyToken != undefined) {
        setSpotifyAccountStatus(true);
      } else {
        setSpotifyAccountStatus(false);
      }
      if (props.user.isPrivate == false) {
        setIsPrivateStatus(false);
      } else {
        setIsPrivateStatus(true);
      }
    }
  }, [props.user]);

  if (!props.user) {
    return <div>fetching user data</div>;
  } else {
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
            <AppleLink
              setUser={props.setUser}
              appleMusicInstance={props.appleMusicInstance}
            />
            <div>{`Apple API connected: ${appleAccountStatus}`}</div>
            <button
              className="p-2 rounded-md bg-amber-300"
              onClick={async () => {
                await unlinkMusic("apple").then(async () => {
                  props.setUser(await fetchUser());
                });
              }}
            >
              Unlink Apple Music
            </button>
            <SpotifyLinkButton setUser={props.setUser} />
            <div>{`Spotify API connected: ${spotifyAccountStatus}`}</div>
            <button
              className="p-2 rounded-md bg-amber-300"
              onClick={async () => {
                await unlinkMusic("spotify").then(async () => {
                  props.setUser(await fetchUser());
                });
              }}
            >
              Unlink Spotify
            </button>

            <ProfileImgCropper
              onCropComplete={console.log}
              setUser={props.setUser}
              user={props.user}
            />
            {/* 
            <input
              className="e-input"
              type="text"
              placeholder="Enter Profile Photo URL"
              value={profileImgUrl}
              onChange={(e) => setProfileImgUrl(e.target.value)}
            />

            <UpdateProfileURL url={profileImgUrl} /> */}

            <BackgroundImgCropper
              onCropComplete={console.log}
              setUser={props.setUser}
              user={props.user}
            />
            {/* 
            <input
              className="e-input"
              type="text"
              placeholder="Enter Background Photo URL"
              value={backgroundImgUrl}
              onChange={(e) => setBackgroundImgUrl(e.target.value)}
            />
            <UpdateBackgroundURL url={backgroundImgUrl} /> */}

            <div>Is account public or private</div>
            <div>{`Account private: ${isPrivateStatus}`}</div>
            <SetPrivateLink setUser={props.setUser} user={props.user} />
            <SetPublicLink setUser={props.setUser} user={props.user} />

            <div className="flex justify-center">
              <div>
                <input
                  className="mt-[0.3rem] mr-2 h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 dark:bg-neutral-600 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 dark:after:bg-neutral-400 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary dark:checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary dark:checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s]"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault"
                  onChange={async () => {
                    if (isPrivateStatus) {
                      // True (that means it is Private account) // False (that means it is Public account)
                      // It is private then call to set it public
                      console.log("Set Public");
                      console.log(props.user?.email);

                      setVisibilityPublic(props.user?.email).then(async () => {
                        props.setUser(await fetchUser());
                        setIsPrivateStatus(false);
                        console.log("called")
                        console.log(isPrivateStatus)
                      }).catch((error) => {
                        console.error(error);
                      })

                    } else {
                      // call to set it private
                      console.log("Set Private");
              
                      setVisibilityPrivate(props.user?.email).then(async () => {
                        props.setUser(await fetchUser());
                        setIsPrivateStatus(true);
                        console.log("called")
                        console.log(isPrivateStatus)
                      }).catch((error) => {
                        console.error(error);
                      })
                    }
                  }}
                />
                <label
                  className="inline-block pl-[0.15rem] hover:cursor-pointer"
                  // for="flexSwitchCheckDefault"
                ></label>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default SettingsPage;
