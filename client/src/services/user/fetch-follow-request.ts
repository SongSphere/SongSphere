import { TFollowRequest } from "../../types/follow-request";

const fetchFollowRequest = async (username: string) => {
  return new Promise<TFollowRequest[]>(async (resolve, reject) => {
    await fetch(
      `${process.env.REACT_APP_API}/api/user/followRequest/${username}`,
      {
        method: "get",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then(async (res) => {
        return res.json();
      })
      .then((data) => {
        const followRequests = data.followRequests;
        resolve(followRequests as TFollowRequest[]);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export default fetchFollowRequest;
