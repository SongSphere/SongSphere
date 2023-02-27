import MusicPlayerCard from "../components/music-player-card";
import NewNavbar from "../components/new-navbar";

const OwnProfilePage = () => {
  return (
    <div className="w-full h-full min-h-screen min-w-screen bg-slate-100">
      <NewNavbar />
      <div className="grid grid-cols-4 gap-8">
        <div>maybe friend activities</div>
        <div className="col-span-2">profile stuff</div>
        <MusicPlayerCard />
      </div>
    </div>
  );
};

export default OwnProfilePage;