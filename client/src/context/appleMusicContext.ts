import { createContext } from "react";

export interface IAppleMusicContext {
  musicInstance: MusicKit.MusicKitInstance | null;
  setMusicInstance: Function;
}

export const appleMusicContext = createContext<IAppleMusicContext>({
  musicInstance: null,
  setMusicInstance: (musicInstance: MusicKit.MusicKitInstance) => {},
});
