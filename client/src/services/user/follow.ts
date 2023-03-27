export const follow = async (
  usernameOfUserMakingFollow: string,
  usernameOfUserGettingFollowed: string,
  emailOfUserGettingFollowed: string
) => {
  return new Promise((resolve, reject) => {
    fetch(`${process.env.REACT_APP_API}/api/addfollower`, {
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
    })
      .then((res) => {
        resolve(true);
      })
      .catch((error) => {
        reject(false);
      });
  });
};

export const unfollow = async (
  usernameOfUserUnfollowing: string,
  usernameOfUserGettingUnfollowed: string,
  emailOfUserGettingUnfollowed: string
) => {
  return new Promise((resolve, reject) => {
    fetch(`${process.env.REACT_APP_API}/api/removefollower`, {
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
    })
      .then((res) => {
        resolve(true);
      })
      .catch((error) => {
        reject(false);
      });
  });
};
