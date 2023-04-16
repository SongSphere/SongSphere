import Navbar from "../components/navbar";

interface IMainLayoutProps {
  left: JSX.Element;
  middle: JSX.Element;
  right: JSX.Element;
}

const EvenLayout = (props: IMainLayoutProps) => {
  return (
    <div className="w-full h-full min-h-screen bg-slate-900 min-w-screen">
      <div className="fixed z-10">
        <Navbar />
      </div>

      <div className="relative h-screen gap-2 lg:grid lg:grid-cols-3">
        <div className="lg:pt-24 lg:h-screen">
          <div className="lg:h-full bg-slate-900">{props.left}</div>
        </div>
        <div className="lg:pt-24 lg:h-screen">
          <div className=" lg:h-full bg-slate-900">{props.middle}</div>
        </div>
        <div className="lg:pt-24 lg:h-screen">
          <div className="lg:h-full bg-slate-900">{props.right}</div>
        </div>
      </div>
    </div>
  );
};

export default EvenLayout;
