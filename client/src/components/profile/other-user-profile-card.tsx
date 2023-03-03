import React from "react";
import { useNavigate } from "react-router-dom";
import { TPost } from "../../types/post";
import { TUser } from "../../types/user";
import { OtherFollowerInformationCard } from "./follow-buttons";

interface IProfileCardProps {
  user: TUser | null;
  setUser: React.Dispatch<React.SetStateAction<TUser | null>>;
  setSelectEditPost: React.Dispatch<React.SetStateAction<TPost | null>>;
  selectedUser: TUser | null;
  setSelectedUser: React.Dispatch<React.SetStateAction<TUser | null>>;
}

const OtherUserProfileCard = (props: IProfileCardProps) => {
  let navigate = useNavigate();

  return (
    <div className="flex justify-center h-screen">
      <div className="fixed flex h-full mt-8">
        <div className="bg-white w-80 h-5/6 drop-shadow-md">
          <div className="relative w-full bg-gradient-to-tl from-purple-900 to-green-700 h-80">
            <img
              // Replace here
              src="https://farm4.staticflickr.com/3856/14579490651_194962a4a4_k.jpg?momo_cache_bg_uuid=168aba1d-4274-421a-85f3-756d7469b068"
              className="absolute object-cover w-full h-full mix-blend-overlay"
            />
            <div className="p-8">
              <div className="flex justify-center mt-8">
                <div className="w-32 h-32 drop-shadow-md">
                  <img
                    className="w-full h-full rounded-full"
                    src={props.selectedUser!.profileImgUrl}
                  ></img>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 text-2xl font-bold text-center text-black">{`${
            props.selectedUser!.givenName
          } ${props.selectedUser!.middleName} ${
            props.selectedUser!.familyName
          }`}</div>
          <div className="text-center text-black">
            {props.selectedUser!.userName}
          </div>

          <div className="text-center">
            <button
              className="pt-6 rounded-full text-slate-500"
              onClick={() => {
                navigate("/settings");
              }}
            >
              edit
            </button>
          </div>
          <OtherFollowerInformationCard
            user={props.user}
            setUser={props.setUser}
            selectedUser={props.selectedUser}
            setSelectedUser={props.setSelectedUser}
          />
        </div>
      </div>
    </div>
  );
};

export default OtherUserProfileCard;
