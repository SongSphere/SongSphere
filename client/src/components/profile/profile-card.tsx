import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { TUser } from "../../types/user";
import { MyFollowerInformationCard } from "./follow-buttons";

interface IProfileCardProps {
  user: TUser;
}

const ProfileCard = (props: IProfileCardProps) => {
  let navigate = useNavigate();

  return (
    <div className="flex justify-center h-screen">
      <div className="fixed flex h-full mt-8">
        <div className="bg-white w-80 h-5/6 drop-shadow-md">
          <div className="relative w-full bg-gradient-to-tl from-purple-900 to-green-700 h-80">
            <img
              src={props.user.backgroundImgUrl}
              className="absolute object-cover w-full h-full mix-blend-overlay"
            />
            <div className="p-8">
              <div className="flex justify-center mt-8">
                <div className="w-32 h-32 drop-shadow-md">
                  <img
                    className="w-full h-full rounded-full"
                    src={props.user.profileImgUrl}
                  ></img>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 text-2xl font-bold text-center text-black">{`${props.user.givenName} ${props.user.middleName} ${props.user.familyName}`}</div>
          <div className="text-center text-black">{props.user.userName}</div>

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
          {/* <MyFollowerInformationCard
            user={props.user}
            setUser={props.setUser}
          /> */}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
