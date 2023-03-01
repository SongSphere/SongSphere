import { TUser } from "../../types/user";

interface IProfileCardProps {
  user: TUser;
}

const ProfileCard = (props: IProfileCardProps) => {
  return (
    <div className="relative flex justify-center h-screen">
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
          <div className="mt-6 text-2xl font-bold text-center">{`${props.user.givenName} ${props.user.middleName} ${props.user.familyName}`}</div>
          <div className="text-center text-slate-600">
            {props.user.userName}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
