import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import fetchFollowRequest from "../services/user/fetch-follow-request";
import fetchUserByUsername from "../services/user/fetch-user-username";
import Session from "../session";
import { TFollowRequest } from "../types/follow-request";
import { TUser } from "../types/user";

const FollowRequestPage = () => {
  const [followRequests, setFollowRequests] = useState<TFollowRequest[]>([]);
  const [requesters, setRequesters] = useState<TUser[]>([]);
  const [user, setUser] = useState<TUser | null>(null);

  useEffect(() => {
    setUser(Session.getUser());
  }, [Session.getUser()]);

  useEffect(() => {
    if (user) {
      fetchFollowRequest(user.username).then((followRequests) => {
        setFollowRequests(followRequests);
        for (let i = 0; i < followRequests.length; ++i) {
          fetchUserByUsername(followRequests[i].followerUsername).then(
            (user) => {
              setRequesters(requesters.concat([user]));
            }
          );
        }
      });
    }
  }, [user]);

  return (
    <div className="w-full h-full min-h-screen min-w-screen bg-slate-100">
      <Navbar />
      <div className="grid grid-cols-5">
        <div className="col-span-3 col-start-2 mt-10">
          {requesters.map((requester) => {
            return (
              <div key={requester.username} className="flex h-32 p-4 bg-white">
                <div className="p-4">
                  <img
                    className="rounded-full"
                    src={requester.profileImgUrl}
                  ></img>
                </div>
                <div>
                  <span className="font-bold">{requester.username}</span>
                  <span className="pl-4">Want to follow you!</span>
                  <div>
                    <button className="px-2 py-1 bg-blue-500 rounded-lg">
                      accept
                    </button>
                    <button className="px-2 py-1 ml-2 rounded-lg bg-slate-300">
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
