export const follow = async (
  usernameOfUserMakingFollow: string,
  usernameOfUserGettingFollowed: string,
  emailOfUserGettingFollowed: string
) => {
  try {
    await fetch(`${process.env.REACT_APP_API}/api/addfollower`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        usernameOfUserMakingFollow: usernameOfUserMakingFollow,
        usernameOfUserGettingFollowed: usernameOfUserGettingFollowed,
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

export const unfollow = async (
  usernameOfUserUnfollowing: string,
  usernameOfUserGettingUnfollowed: string,
  emailOfUserGettingUnfollowed: string
) => {
  try {
    await fetch(`${process.env.REACT_APP_API}/api/removefollower`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        usernameOfUserUnfollowing: usernameOfUserUnfollowing,
        usernameOfUserGettingUnfollowed: usernameOfUserGettingUnfollowed,
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
