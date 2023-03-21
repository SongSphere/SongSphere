import Navbar from "../components/navbar";
import { TUser } from "../types/user";
import Session from "../session";
import { useEffect, useState } from "react";

interface IHomePageProps {
  appleMusicInstance: MusicKit.MusicKitInstance;
}

const HomePage = (props: IHomePageProps) => {
  const [user, setUser] = useState<TUser | null>();
  useEffect(() => {
    setUser(Session.getUser());
  }, [Session.getUser()]);

  if (!user) {
    return <div>fetching user</div>;
  }

  return (
    <div className="w-full h-full min-h-screen min-w-screen bg-slate-100">
      <Navbar />
    </div>
  );
};

export default HomePage;
