import { TPost } from "../../types/post";

const fetchAnalytics = async () => {
  return new Promise<number[]>(async (resolve, reject) => {
    let analytics: number[] = [];

    await fetch(`${process.env.REACT_APP_API}/user/analytics`, {
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
        analytics.push(...(data.analytics as number[]));
        resolve(analytics);
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
};

export default fetchAnalytics;
