import { useEffect, useState } from "react";
import fetchActiveListeningUsers from "../../services/general/fetch-active-listening";
import Session from "../../session";
import { TMusicContent } from "../../types/music-content";
import { TUser } from "../../types/user";

const FriendActivityCard = () => {
  const [activeUsers, setActiveUsers] = useState<
    { user: TUser; song: TMusicContent }[]
  >([]);
  const [user, setUser] = useState<TUser | null>(null);

  useEffect(() => {
    setUser(Session.getUser());

    const fetchListening = async () => {
      if (user) {
        try {
          const listeningUsers = await fetchActiveListeningUsers();
          if (listeningUsers == undefined || listeningUsers.length == 0) {
            setActiveUsers([]);
          } else {
            setActiveUsers(listeningUsers);
          }
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchListening();
    const interval = setInterval(fetchListening, 2000);

    return () => clearInterval(interval);
  }, [user]);

  if (!user) {
    return <div>fetching user</div>;
  }

  return (
    <div className="flex justify-center w-full h-full p-4">
      <div className="rounded-md h-5/6 drop-shadow-md">
        <h1 className="pt-16 pb-2 font-semibold text-center text-white lg:pt-0 ">
          Friend Listening Activity
        </h1>
        <div className="flex flex-row overflow-auto lg:flex-col no-scrollbar">
          {activeUsers.map(({ user: u, song: s }) => {
            return (
              <div>
                <div className="flex-1 block w-full px-3 py-2 mt-2 overflow-hidden text-white rounded-md hover:bg-gray-800">
                  <div className="inline-flex items-center">
                    <div className="w-10 h-10 mr-4 overflow-hidden border-2 rounded-full border-sky-300">
                      <img
                        className="w-full h-full"
                        src={u.profileImgUrl}
                        alt="Avatar of Jonathan Reinink"
                      ></img>
                    </div>

                    <div className="text-sm">
                      <div className="font-bold text-1l">{u.username}</div>
                      <div className="font-bold text-2l">{s.name}</div>
                      <div className="">{s.artist}</div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FriendActivityCard;
