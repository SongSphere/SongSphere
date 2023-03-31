import { TUser } from "./types/user";

const Session = (function () {
  let user: TUser | null = null;
  let musicService: string = "";
  let isLoggedIn: Boolean = false;
  let AMInstance: MusicKit.MusicKitInstance | null = null; // AM stands for Apple Music

  const getUser = () => {
    return user;
  };

  const setUser = (u: TUser | null) => {
    user = u;
  };

  const getMusicService = () => {
    return musicService;
  };

  const getAMInstance = () => {
    return AMInstance;
  };

  const setAMInstance = (am: MusicKit.MusicKitInstance) => {
    AMInstance = am;
  };

  const setMusicService = (m: string) => {
    musicService = m;
  };

  const getIsLoggedIn = () => {
    return isLoggedIn;
  };

  const setIsLoggedIn = (i: Boolean) => {
    isLoggedIn = i;
  };

  return {
    getUser: getUser,
    setUser: setUser,
    getMusicService: getMusicService,
    setMusicService: setMusicService,
    getIsLoggedIn: getIsLoggedIn,
    setIsLoggedIn: setIsLoggedIn,
    getAMInstance: getAMInstance,
    setAMInstance: setAMInstance,
  };
})();

export default Session;
