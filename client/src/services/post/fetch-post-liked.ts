const fetchPostLiked = async (id: string) => {
  return new Promise<boolean>(async (resolve, reject) => {
    await fetch(`${process.env.REACT_APP_API}/api/post/fetchPostLiked/${id}`, {
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
        const likes = data.liked as boolean;
        resolve(likes);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
export default fetchPostLiked;
