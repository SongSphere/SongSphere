const likeComment = async (id: string) => {
  await fetch(`${process.env.REACT_APP_API}/api/post/updateLikeComment`, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify({
      id: id,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).catch((error) => {
    console.error(error);
  });
};

export default likeComment;
