import { useNavigate } from "react-router-dom";
import { TUser } from "../../types/user";
import OtherFollowerCard from "./other-follower-card";

interface IProfileCardProps {
  selectedUser: TUser | null;
  user: TUser | null;
}

const OtherUserProfileCard = (props: IProfileCardProps) => {
  let navigate = useNavigate();
  if (!props.selectedUser) {
    return <div>fetching user</div>;
  }
  return (
    <div className="flex justify-center h-screen">
      <div className="fixed flex h-full mt-8">
        <div className="bg-white w-80 h-5/6 drop-shadow-md">
          <div className="relative w-full bg-gradient-to-tl from-purple-900 to-green-700 h-80">
            <img
              src={props.selectedUser.backgroundImgUrl}
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
            {props.selectedUser!.username}
          </div>
          <OtherFollowerCard selectedUser={props.selectedUser} />
        </div>
      </div>
    </div>
  );
};

export default OtherUserProfileCard;
