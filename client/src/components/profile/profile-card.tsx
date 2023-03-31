import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Session from "../../session";
import { TUser } from "../../types/user";

interface IProfileCardProps {
  openFollowingModal: Function;
  openFollowersModal: Function;
}

const ProfileCard = (props: IProfileCardProps) => {
  const user = Session.getUser();
  let navigate = useNavigate();

  const [followerButtonText, setFollowerButtonText] = useState(
    `${user!.followers.length} followers`
  );
  const [followingButtonText, setFollowingButtonText] = useState(
    `${user!.following.length} following`
  );

  const handleOpenFollowers = () => {
    props.openFollowersModal();
  };

  const handleOpenFollowing = () => {
    props.openFollowingModal();
  };

  if (!user) {
    return <div>fetching user data</div>;
  }

  return (
    <div className="flex justify-center h-screen">
      <div className="fixed flex h-full mt-8">
        <div className="bg-white w-80 h-5/6 drop-shadow-md">
          <div className="relative w-full bg-gradient-to-tl from-purple-900 to-green-700 h-80">
            <img
              src={user.backgroundImgUrl}
              className="absolute object-cover w-full h-full mix-blend-overlay"
            />
            <div className="p-8">
              <div className="flex justify-center mt-8">
                <div className="w-32 h-32 drop-shadow-md">
                  <img
                    className="w-full h-full rounded-full"
                    src={user.profileImgUrl}
                  ></img>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 text-2xl font-bold text-center text-black">{`${user.givenName} ${user.middleName} ${user.familyName}`}</div>
          <div className="text-center text-black">{user.username}</div>

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
          <div className="text-center">
            <button
              className="rounded-full text-slate-500"
              onClick={() => {
                navigate("/likes");
              }}
            >
              view likes
            </button>
          </div>
          <div className="text-center">
            <button
              className="rounded-full text-slate-500"
              onClick={() => {
                navigate("/recents");
              }}
            >
              recently played
            </button>
          </div>
          <div className="text-center">
            <button
              className="rounded-full text-slate-500"
              onClick={() => {
                navigate("/playlist");
              }}
            >
              My Playlist
            </button>
          </div>

          <div className="px-2 py-2">
            <div className="p-1 rounded-lg bg-lgrey">
              <button
                className={`ml-3 px-2 text-md py-2 rounded text-gre hover:bg-gray-400`}
                onClick={() => handleOpenFollowers()}
              >
                {followerButtonText}
              </button>

              <button
                className={`ml-3 px-2 text-md py-2 rounded text-grey hover:bg-gray-400`}
                onClick={() => handleOpenFollowing()}
              >
                {followingButtonText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
