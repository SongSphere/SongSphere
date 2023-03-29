import { TPost } from "../../types/post";

export const getDefaultPlatform = async (): Promise<string> => {
  return new Promise<string>(async () => {
    await fetch(`${process.env.REACT_APP_API}/user/getDefaultPlatform`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        return data;
      })
      .catch((error) => {
        console.error(error);
      });
  });
};

export const setDefaultPlatform = async (platform: string) => {
  await fetch(`${process.env.REACT_APP_API}/user/setDefaultPlatform`, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify({
      platform: platform,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).catch((error) => {
    console.error(error);
  });
};
