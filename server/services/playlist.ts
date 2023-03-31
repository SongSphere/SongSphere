import User from "../db/user";
import { fetchPostsByUsername } from "./post";

export const fetchPlaylist = async (username: string) => {
  try {
    const user = await User.findOne({ username: username });
    const followers = user.following;

    let selectedSongCount = 0;
    const playlistLength = 20;
    const playlist = [];
    const postPool = [];

    for (let i = 0; i < followers.length; ++i) {
      const followerPosts = await fetchPostsByUsername(followers[i].toString());
      postPool.push(followerPosts);
    }

    while (selectedSongCount < playlistLength) {
      let postAdded = false;
      for (let i = 0; i < postPool.length; ++i) {
        const posts = postPool[i];
        if (posts.length) {
          postAdded = true;
          const post = posts.pop();
          playlist.push(post);
          selectedSongCount += 1;
        }
      }
      if (!postAdded) {
        break;
      }
    }
    return playlist;
  } catch (error) {
    throw error;
  }
};
