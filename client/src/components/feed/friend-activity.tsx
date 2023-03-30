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
          console.log(activeUsers);
        } catch (error) {
          console.log(error);
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
    <div className="relative flex justify-center h-screen">
      <div className="fixed flex h-full mt-8">
        <div className="bg-white rounded-md w-80 h-5/6 drop-shadow-md">
          <h1 className="pt-5 pb-2 text-center text-gray-900 ">
            Friend Listening Activity
          </h1>
          <div className="w-5/6 mx-auto border-b-2 border-gray-300"></div>
          <div className="px-2">
            <div className="py-2">
              <div className="overflow-y-auto max-h-[45vh]">
                {activeUsers.map(({ user: u, song: s }) => {
                  return (
                    <div>
                      <div className="flex-1 block w-full px-3 py-2 mt-2 overflow-hidden rounded-md bg-lgrey ">
                        <div className="inline-flex items-center">
                          <img
                            className="w-10 h-10 mr-4 rounded-full"
                            src={u.profileImgUrl}
                            alt="Avatar of Jonathan Reinink"
                          ></img>
                          <div className="text-sm">
                            <div className="text-1l font-bold">
                              {u.username}
                            </div>
                            <div className="text-2l font-bold">{s.name}</div>
                            <div className="text-slate-500">{s.artist}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendActivityCard;