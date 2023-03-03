import { TUser } from "../../types/user";
import { FollowButton, OtherFollowerInformationCard } from "./follow-buttons";

interface IProfileCardProps {
  user: TUser | null;
  setUser: React.Dispatch<React.SetStateAction<TUser | null>>;
  selectedUser: TUser | null;
  setSelectedUser: React.Dispatch<React.SetStateAction<TUser | null>>;
}

const OtherUserProfileCard = (props: IProfileCardProps) => {
  return (
    <div className="flex justify-center h-screen">
      <div className="fixed flex h-full mt-8">
        <div className="bg-white w-80 h-5/6 drop-shadow-md">
          <div className="flex justify-center mt-8">
            <div className="w-32 h-32 drop-shadow-md">
              <img
                className="w-full h-full rounded-full"
                src={props.selectedUser!.profileImgUrl}
              ></img>
            </div>
          </div>
          <div className="mt-6 text-2xl font-bold text-center text-navy">{`${
            props.selectedUser!.givenName
          } ${props.selectedUser!.middleName} ${
            props.selectedUser!.familyName
          }`}</div>
          <div className="text-center text-slate-600">
            {props.selectedUser!.userName}
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
