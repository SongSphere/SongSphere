export const follow = async (emailOfUserGettingFollowed: string) => {
  try {
    await fetch(`${process.env.REACT_APP_API}/api/addfollower`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        emailOfUserGettingFollowed: emailOfUserGettingFollowed,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export const unfollow = async (emailOfUserGettingUnfollowed: string) => {
  try {
    await fetch(`${process.env.REACT_APP_API}/api/removefollower`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        emailOfUserGettingUnfollowed: emailOfUserGettingUnfollowed,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    console.log(err);
  }
};
