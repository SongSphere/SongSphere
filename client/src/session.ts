import { TUser } from "./types/user";

const Session = (function () {
  let user: TUser | null = null;
  let musicService: String = "";

  const getUser = () => {
    return user;
  };

  const setUser = (u: TUser | null) => {
    user = u;
  };

  const getMusicService = () => {
    return musicService;
  };

  const setMusicService = (m: String) => {
    musicService = m;
  };

  return {
    getUser: getUser,
    setUser: setUser,
    getMusicService: getMusicService,
    setMusicService: setMusicService,
  };
})();

export default Session;
