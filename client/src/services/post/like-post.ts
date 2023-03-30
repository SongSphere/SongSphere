const likePost = async (id: string) => {
  try {
    await fetch(`${process.env.REACT_APP_API}/api/post/updateLikePost`, {
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

export default likePost;
