import { TUser } from "../../types/user";
import { FollowButton } from "./follow-buttons";

interface IProfileCardProps {
  user: TUser;
  setUser: React.Dispatch<React.SetStateAction<TUser | null>>;
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
                src={props.user.profileImgUrl}
              ></img>
            </div>
          </div>
          <div className="mt-6 text-2xl font-bold text-center text-navy">{`${props.user.givenName} ${props.user.middleName} ${props.user.familyName}`}</div>
          <div className="text-center text-slate-600">
            {props.user.userName}
          </div>
          <FollowButton user={props.user} setUser={props.setUser} />
        </div>
      </div>
    </div>
  );
};

export default OtherUserProfileCard;
