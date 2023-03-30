const fetchPostLikes = async (id: string) => {
  return new Promise<number>(async (resolve, reject) => {
    await fetch(`${process.env.REACT_APP_API}/api/post/fetchPostLikes/${id}`, {
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
        const likes = data.likes as number;
        resolve(likes);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
export default fetchPostLikes;
