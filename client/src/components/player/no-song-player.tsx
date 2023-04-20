const NoSongPlayer = () => {
  return (
    <div className="flex flex-row justify-center h-full text-white rounded-lg lg:m-4 lg:flex-col bg-slate-800">
      <div className="flex w-1/2 p-4 lg:w-full">
        <div className="w-1/5 p-4 bg-slate-500">
          <img src="/img/icons/music-icon.svg"></img>
        </div>
        <div className="w-4/5 ml-3 text-2xl font-semibold ">
          Click a song to start playing!
        </div>
      </div>
      <div className="w-1/2 p-4 lg:w-full">
        <div className="flex flex-col pt-8 lg:pt-0 place-items-center">
          <div className="w-4/5 h-1 bg-neutral-200 dark:bg-neutral-600"></div>
        </div>
      </div>
    </div>
  );
};

export default NoSongPlayer;
