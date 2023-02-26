const MusicPlayerCard = () => {
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
        </div>
      </div>
    </div>
  );
};
export default MusicPlayerCard;
