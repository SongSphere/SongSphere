import Navbar from "../components/navbar";

interface IMainLayoutProps {
  left: JSX.Element;
  middle: JSX.Element;
  right: JSX.Element;
}

const MainLayout = (props: IMainLayoutProps) => {
  return (
    <div className="w-full h-full min-h-screen bg-slate-900 min-w-screen">
      <div className="absolute z-10">
        <Navbar />
      </div>

      <div className="grid h-screen grid-rows-4 gap-2 lg:grid-cols-4">
        <div className="pt-16 lg:pt-24 lg:h-screen">
          <div className=" lg:h-full">{props.left}</div>
        </div>
        <div className="row-span-2 overflow-y-auto no-scrollbar lg:pt-24 lg:h-screen lg:col-span-2">
          <div className=" lg:h-full">{props.middle}</div>
        </div>
        <div className="lg:pt-24 lg:h-screen">
          <div className="lg:h-full">{props.right}</div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
