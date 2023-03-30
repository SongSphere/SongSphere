export const block = async (
  usernameOfUserMakingBlock: string,
  usernameOfUserGettingBlocked: string,
  emailOfUserGettingBlocked: string
) => {
  try {
    await fetch(`${process.env.REACT_APP_API}/api/addblockedaccount`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        usernameOfUserMakingBlock: usernameOfUserMakingBlock,
        usernameOfUserGettingBlocked: usernameOfUserGettingBlocked,
        emailOfUserGettingBlocked: emailOfUserGettingBlocked,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    console.error(err);
  }
};

export const unblock = async (
  usernameOfUserUnblocking: string,
  usernameOfUserGettingUnblocked: string,
  emailOfUserGettingUnblocked: string
) => {
  try {
    await fetch(`${process.env.REACT_APP_API}/api/removeblockedaccount`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        usernameOfUserUnblocking: usernameOfUserUnblocking,
        usernameOfUserGettingUnblocked: usernameOfUserGettingUnblocked,
        emailOfUserGettingUnblocked: emailOfUserGettingUnblocked,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    console.error(err);
  }
};
