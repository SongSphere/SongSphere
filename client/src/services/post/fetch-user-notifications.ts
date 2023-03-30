import { TNotification } from "../../types/notification";

const fetchNotificationsByEmailAddress = async (emailAddress: string) => {
  return new Promise<TNotification[]>(async (resolve, reject) => {
    await fetch(
      `${process.env.REACT_APP_API}/api/user/getNotification/${emailAddress}`,
      {
        method: "GET",
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
        console.log(`Notifications ${data}`);
        resolve(data.notifications);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export default fetchNotificationsByEmailAddress;
