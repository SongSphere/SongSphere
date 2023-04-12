import Navbar from "../components/navbar";

const MainLayout = () => {
  const left = <div className="">left</div>;
  const middle = <div className="">middle</div>;
  const right = <div className="">right</div>;
  return (
    <div className="w-full h-full min-h-screen bg-lblue min-w-screen">
      <div className="absolute">
        <Navbar />
      </div>

      <div className="grid h-screen grid-rows-4 gap-2 lg:grid-cols-4">
        <div className="h-screen mt-24 lg:mt-0">
          <div className="bg-red-200 lg:h-full lg:pt-16">{left}</div>
        </div>
        <div className="h-screen row-span-2 mt-24 lg:mt-0 lg:col-span-2">
          <div className="bg-blue-200 lg:h-full lg:pt-16">{middle}</div>
        </div>
        <div className="h-screen mt-24 lg:mt-0">
          <div className="bg-green-200 lg:h-full lg:pt-16">{right}</div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
