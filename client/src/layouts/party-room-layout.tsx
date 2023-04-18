import Navbar from "../components/navbar";

interface IMainLayoutProps {
  left: JSX.Element;
  middle: JSX.Element;
  right: JSX.Element;
}

const PartyRoomLayout = (props: IMainLayoutProps) => {
  return (
    <div className="w-full h-full min-h-screen bg-slate-900 min-w-screen">
      <div className="fixed z-10">
        <Navbar />
      </div>

      <div className="relative h-screen gap-2 lg:grid lg:grid-cols-4">
        <div className="pt-16 lg:pt-24 lg:h-screen">
          <div className="lg:h-full">{props.left}</div>
        </div>
        <div className="lg:overflow-y-auto h-3/4 lg:row-span-2 no-scrollbar lg:pt-24 lg:h-screen lg:col-span-2">
          <div className="bg-green-300 lg:h-full">{props.middle}</div>
        </div>
        <div className="lg:pt-24 lg:h-screen">
          {/* <div className="lg:h-1/2"> */}
          <div className="fixed bottom-0 w-full bg-blue-300 lg:static lg:h-full">
            {props.right}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartyRoomLayout;
