import { useState } from "react";

const MusicPlayerCard = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const playMusicHander = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="relative flex justify-center h-screen">
      <div className="fixed flex h-full mt-8">
        <div className="bg-white w-80 h-5/6">
          <div className="flex justify-center">
            <div className="w-4/5 mt-5">
              <img src="/img/trackCoverDemo.jpg"></img>
            </div>
          </div>
          <div className="mt-2 text-2xl text-center">Into the Night</div>
          <div className="flex justify-center mt-2">
            <div
              className="w-5 h-5 cursor-pointer"
              onClick={() => {
                playMusicHander();
              }}
            >
              <img
                src={
                  isPlaying
                    ? "/img/icons/pause-icon.png"
                    : "/img/icons/play-icon.png"
                }
              ></img>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MusicPlayerCard;
