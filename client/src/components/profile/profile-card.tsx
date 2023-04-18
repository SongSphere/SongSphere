import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Session from "../../session";
import fetchAnalytics from "../../services/user/fetch-analytics";



interface IProfileCardProps {
  openFollowingModal: Function;
  openFollowersModal: Function;
}

const ProfileCard = (props: IProfileCardProps) => {
  const [analytics, setAnalytics] = useState<number[]>([]);
  const [analyticsOpen, setAnalyticsOpen] = useState(false);

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

  const handleCloseAnalytics = (e: React.ChangeEvent<any>) => {
    if (e.target.id === "modal-container") {
      setAnalyticsOpen(false);
    }
  };

  const handleOpenAnalytics = async () => {
    setAnalyticsOpen(!analyticsOpen);
    const a = await fetchAnalytics();
    setAnalytics(a);
  };

  if (!user) {
    return <div>fetching user data</div>;
  }

  return (
    <div className="w-full h-full">
      <div className="p-4 h-5/6 drop-shadow-md">
        <div className="relative font-bold text-white h-80">
          <img
            src={user.backgroundImgUrl}
            className="absolute object-cover w-full h-full rounded-lg mix-blend-overlay brightness-75"
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
          <div className="mt-6 text-2xl text-center">{`${user.givenName} ${user.middleName} ${user.familyName}`}</div>
          <div className="text-center">{user.username}</div>
        </div>
        <div className="pb-5 font-semibold text-white rounded-b-lg bg-slate-800">
          <div className="flex justify-center w-full pt-2 pb-2 font-bold">
            <button className="text-md" onClick={() => handleOpenFollowers()}>
              {followerButtonText}
            </button>
            <button
              className="ml-3 text-md"
              onClick={() => handleOpenFollowing()}
            >
              {followingButtonText}
            </button>
          </div>
          <div className="p-4 text-center">{user.biography}</div>
          <div className="flex justify-center gap-2">
            <button
              className="px-4 py-1 rounded-md bg-slate-700"
              onClick={() => {
                navigate("/settings");
              }}
            >
              edit
            </button>
            <button
              className="px-4 py-1 rounded-md bg-slate-700"
              onClick={() => {
                navigate("/recents");
              }}
            >
              recently played
            </button>
          </div>
          <div className="flex justify-center gap-2 mt-2">
            <button
              className="px-4 py-1 rounded-md bg-slate-700"
              onClick={() => {
                navigate("/likes");
              }}
            >
              view likes
            </button>

            <button
              className="px-4 py-1 rounded-md bg-slate-700"
              onClick={() => {
                navigate("/playlist");
              }}
            >
              My Playlist
            </button>

            <button
              className="px-4 py-1 rounded-md bg-slate-700"
              onClick={() => {
                handleOpenAnalytics();
              }}
            >
              Post Analytics
            </button>
          </div>
          <div className="flex justify-bottom">
            {analyticsOpen ? (
              <div
                id="modal-container"
                onClick={handleCloseAnalytics}
                className="fixed inset-0 flex items-center justify-center bg-opacity-30 backdrop-blur-sm"
              >
                <div className="w-3/4 p-4 bg-slate-700 rounded-md grid grid-cols-4">
                  <div className="col-span-3">Total Likes:</div>
                  <div>{analytics[0]}</div>
                  <div className="col-span-3">Average Likes:</div>
                  <div>{analytics[1]}</div>
                  <div className="col-span-3">Total Comments:</div>
                  <div>{analytics[2]}</div>
                  <div className="col-span-3">Average Comments:</div>
                  <div>{analytics[3]}</div>
                </div>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
