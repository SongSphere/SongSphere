const unLikePost = async (id: string) => {
  try {
    await fetch(`${process.env.REACT_APP_API}/api/post/updateUnlikePost`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        id: id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {}
};
export default unLikePost;
