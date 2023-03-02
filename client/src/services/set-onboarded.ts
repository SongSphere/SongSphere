import { TPost } from "../types/post";

const setOnboarded = async (email: string | undefined) => {
  await fetch(`${process.env.REACT_APP_API}/api/user/onboard`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      onboarded: true,
    }),
  })
    .then(async (res) => {
      return res.json();
    })
    .catch((error) => {
      console.error(error);
    });
};

export default setOnboarded;
