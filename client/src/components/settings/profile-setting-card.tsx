import { useEffect, useState } from "react";
import setShowSong from "../../services/settings/set-show-song";
import setRandomSong from "../../services/settings/set-random-song";
import setPrivate from "../../services/settings/set-private";
import adjustName from "../../services/user/adjust-name";
import fetchUser from "../../services/user/fetch-user";
import Session from "../../session";
import { TUser } from "../../types/user";
import FailPopUp from "../popup/fail-popup";
import adjustBio from "../../services/user/adjust-bio";

interface IProfileSettingProps {
  setShowBlockModal: React.Dispatch<React.SetStateAction<boolean>>;
  user: TUser;
}

const ProfileSettingCard = (props: IProfileSettingProps) => {
  const [username, setUsername] = useState<string>("");
  const [givenName, setGivenName] = useState<string>("");
  const [middleName, setMiddleName] = useState<string>("");
  const [familyName, setFamilyName] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [isPrivateStatus, setIsPrivateStatus] = useState<boolean>(false);
  const [isRandomStatus, setIsRandomStatus] = useState<boolean>(false);
  const [shareCurrentSong, setShareCurrentSong] = useState<boolean>(false);
  const [saveFailOpen, setSaveFailOpen] = useState(false);
  const SET_SAVE_ERR_MSG =
    "Oops! An error occurs when saving your profile info. Try again later!";

  useEffect(() => {
    setUsername(props.user.username);
    setGivenName(props.user.givenName);
    setMiddleName(props.user.middleName);
    setFamilyName(props.user.familyName);
    setIsPrivateStatus(props.user.isPrivate);
    setIsRandomStatus(props.user.showRandomSong);
    setShareCurrentSong(props.user.showPlayingSong);
    setBio(props.user.biography);
  }, []);

  const handleSave = async () => {
    try {
      await adjustName(username, givenName, middleName, familyName);
      await setShowSong(shareCurrentSong);
      await setRandomSong(isRandomStatus);
      await setPrivate(isPrivateStatus);
      await adjustBio(bio);
      Session.setUser(await fetchUser());
    } catch (err) {
      setSaveFailOpen(true);
      console.error(err);
    }
  };

  return (
    <div className="w-full h-full p-4">
      <div className="pb-10 bg-white rounded-lg">
        <h3 className="pt-10 text-3xl font-semibold text-center">
          Profile Settings
        </h3>
        <div className="flex justify-center">
          <form
            className="p-5"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div className="font-semibold">Username:</div>
            <input
              className="border-b-2 outline-none border-b-lgrey"
              type="text"
              placeholder="Enter User Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <div className="font-semibold">First name:</div>
            <input
              className="border-b-2 outline-none border-b-lgrey"
              type="text"
              placeholder="Enter Given Name"
              value={givenName}
              onChange={(e) => setGivenName(e.target.value)}
            />
            <div className="font-semibold">Middle Name:</div>
            <input
              className="border-b-2 outline-none border-b-lgrey"
              type="text"
              placeholder="Enter Middle Name"
              value={middleName}
              onChange={(e) => setMiddleName(e.target.value)}
            />
            <div className="font-semibold">Biography:</div>
            <input
              className="border-b-2 outline-none border-b-lgrey"
              type="text"
              placeholder="Enter Biography"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
            <div className="font-semibold">Last Name:</div>
            <input
              className="border-b-2 outline-none border-b-lgrey"
              type="text"
              placeholder="Enter Last Name"
              value={familyName}
              onChange={(e) => setFamilyName(e.target.value)}
            />
            <div className="flex">
              <div className="pr-5">Account private:</div>
              <input
                className="mt-[0.3rem] mr-2 h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 dark:bg-neutral-600 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 dark:after:bg-neutral-400 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary dark:checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary dark:checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s]"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault"
                checked={isPrivateStatus}
                onChange={() => {
                  setIsPrivateStatus(!isPrivateStatus);
                }}
              />
            </div>
            <div className="flex">
              <div className="pr-5">Random Song Feature:</div>
              <input
                className="mt-[0.3rem] mr-2 h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 dark:bg-neutral-600 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 dark:after:bg-neutral-400 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary dark:checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary dark:checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s]"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault"
                checked={isRandomStatus}
                onChange={() => {
                  setIsRandomStatus(!isRandomStatus);
                }}
              />
              <label className="inline-block pl-[0.15rem] hover:cursor-pointer"></label>
            </div>
            <div className="flex">
              <div className="pr-5">Display Currently Playing Song:</div>
              <input
                className="mt-[0.3rem] mr-2 h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 dark:bg-neutral-600 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 dark:after:bg-neutral-400 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary dark:checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary dark:checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s]"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault"
                checked={shareCurrentSong}
                onChange={() => {
                  setShareCurrentSong(!shareCurrentSong);
                }}
              />
              <label className="inline-block pl-[0.15rem] hover:cursor-pointer"></label>
            </div>
            <div className="mt-2">
              <button
                className="px-2 py-1 rounded-lg bg-sky-300 hover:bg-sky-400 drop-shadow-lg"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
      <FailPopUp
        open={saveFailOpen}
        setOpen={setSaveFailOpen}
        failText={SET_SAVE_ERR_MSG}
      />
    </div>
  );
};

export default ProfileSettingCard;
