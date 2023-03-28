import FollowRequest from "../db/follow-request";
import User from "../db/user";

export const addFollow = async (
  usernameOfUserGettingFollowed: string,
  usernameOfUserMakingFollow: string
) => {
  try {
    const user = await User.findOne({
      username: usernameOfUserGettingFollowed,
    });
    if (user.isPrivate) {
      const followRequest = new FollowRequest({
        username: usernameOfUserGettingFollowed,
        followerUsername: usernameOfUserMakingFollow,
      });
      await followRequest.save();
    } else {
      await User.updateOne(
        { username: usernameOfUserMakingFollow },
        { $push: { following: usernameOfUserGettingFollowed } }
      );
      await User.updateOne(
        { username: usernameOfUserGettingFollowed },
        { $push: { followers: usernameOfUserMakingFollow } }
      );
    }
  } catch (error) {
    throw error;
  }
};

export const removeFollow = async (
  usernameOfUserGettingUnfollowed: string,
  usernameOfUserUnfollowing: string
) => {
  try {
    await User.updateOne(
      { username: usernameOfUserUnfollowing },
      { $pull: { following: usernameOfUserGettingUnfollowed } }
    );
    await User.updateOne(
      { username: usernameOfUserGettingUnfollowed },
      { $pull: { followers: usernameOfUserUnfollowing } }
    );
  } catch (error) {
    throw error;
  }
};

export const fetchFollowRequests = async (username: string) => {
  try {
    const followRequests = await FollowRequest.find({ username: username });
    return followRequests;
  } catch (error) {
    console.error(error);
  }
};

export const modifyFollowRequest = async (
  id: string,
  action: boolean,
  username: string,
  requester: string
) => {
  try {
    if (action) {
      await acceptFollowRequest(username, requester);
    } else {
      await denyFollowRequest(username, requester);
    }
    await removeFollowRequest(id);
  } catch (error) {
    console.error(error);
  }
};

export const acceptFollowRequest = async (
  username: string,
  requester: string
) => {
  try {
    await User.updateOne(
      { username: requester },
      { $push: { following: username } }
    );
    await User.updateOne(
      { username: username },
      { $push: { followers: requester } }
    );
  } catch (error) {
    console.error(error);
  }
};

export const denyFollowRequest = async (
  username: string,
  requester: string
) => {
  try {
    await User.updateOne(
      { username: requester },
      { $push: { following: username } }
    );
    await User.updateOne(
      { username: username },
      { $push: { followers: requester } }
    );
  } catch (error) {
    console.error(error);
  }
};

export const removeFollowRequest = async (id: string) => {
  try {
    await FollowRequest.deleteOne({ id: id });
  } catch (error) {
    console.error(error);
  }
};

export const addBlockedAccount = async (
  emailOfUserMakingBlock: string,
  usernameOfUserMakingBlock: string,
  usernameOfUserGettingBlocked: string,
  emailOfUserGettingBlocked: string
) => {
  try {
    await User.updateOne(
      { email: emailOfUserMakingBlock },
      { $push: { blockedUsers: usernameOfUserGettingBlocked } }
    );
    await User.updateOne(
      { email: emailOfUserGettingBlocked },
      { $push: { blockedBy: usernameOfUserMakingBlock } }
    );
  } catch (error) {
    throw error;
  }
};

export const unBlockAccount = async (
  usernameOfUserUnblocking: string,
  usernameOfUserGettingUnblocked: string,
  emailOfUserGettingUnblocked: string,
  emailOfUserUnblocking: string
) => {
  try {
    await User.updateOne(
      { email: emailOfUserUnblocking },
      { $pull: { blockedUsers: usernameOfUserGettingUnblocked } }
    );
    await User.updateOne(
      { email: emailOfUserGettingUnblocked },
      { $pull: { blockedBy: usernameOfUserUnblocking } }
    );
  } catch (error) {
    throw error;
  }
};
