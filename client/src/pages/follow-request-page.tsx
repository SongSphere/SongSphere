import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import fetchFollowRequest from "../services/follow/fetch-follow-request";
import fetchUserByUsername from "../services/user/fetch-user-username";
import Session from "../session";
import { TFollowRequest } from "../types/follow-request";
import { TUser } from "../types/user";
import { processFollowRequest } from "../services/follow/process-follow-request";

interface IRequestWrapper {
  requester: TUser;
  id: string;
}

const FollowRequestPage = () => {
  const [followRequests, setFollowRequests] = useState<TFollowRequest[]>([]);
  const [requestersWrap, setRequestersWrap] = useState<IRequestWrapper[]>([]);
  const [user, setUser] = useState<TUser | null>(null);

  useEffect(() => {
    setUser(Session.getUser());
  }, [Session.getUser()]);

  const fetchRequesterData = async (followRequests: TFollowRequest[]) => {
    const tempRequesters: IRequestWrapper[] = [];

    for (let i = 0; i < followRequests.length; ++i) {
      const user = await fetchUserByUsername(
        followRequests[i].followerUsername
      );
      tempRequesters.push({ requester: user, id: followRequests[i].id });
    }

    setRequestersWrap(tempRequesters);
  };

  const updateFollowReqests = async (user: TUser) => {
    const followRequests = await fetchFollowRequest(user.username);
    setFollowRequests(followRequests);
    fetchRequesterData(followRequests);
  };

  useEffect(() => {
    if (user) {
      // fetchFollowRequest(user.username).then((followRequests) => {
      //   setFollowRequests(followRequests);
      //   fetchRequesterData(followRequests);
      // });
      updateFollowReqests(user);
    }
  }, [user]);

  if (!user) {
    return <div>fetching user</div>;
  }

  return (
    <div className="w-full h-full min-h-screen min-w-screen bg-slate-100">
      <Navbar />
      <div className="grid grid-cols-5">
        <div className="col-span-3 col-start-2 mt-10">
          {requestersWrap.map((requesterWrap) => {
            return (
              <div
                key={requesterWrap.requester.username}
                className="flex h-32 p-4 bg-white"
              >
                <div className="p-4">
                  <img
                    className="rounded-full"
                    src={requesterWrap.requester.profileImgUrl}
                  ></img>
                </div>
                <div>
                  <span className="font-bold">
                    {requesterWrap.requester.username}
                  </span>
                  <span className="pl-4">Want to follow you!</span>
                  <div>
                    <button
                      className="px-2 py-1 bg-blue-500 rounded-lg"
                      onClick={() => {
                        processFollowRequest(
                          requesterWrap.id,
                          true,
                          user.username,
                          requesterWrap.requester.username
                        ).then(() => {
                          updateFollowReqests(user);
                        });
                      }}
                    >
                      accept
                    </button>
                    <button
                      className="px-2 py-1 ml-2 rounded-lg bg-slate-300"
                      onClick={() => {
                        processFollowRequest(
                          requesterWrap.id,
                          false,
                          user.username,
                          requesterWrap.requester.username
                        ).then(() => {
                          updateFollowReqests(user);
                        });
                      }}
                    >
                      deny
                    </button>
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

export default FollowRequestPage;
