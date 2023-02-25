// import { useRouter } from 'next/router';
import { BrowserRouter, Routes, Route, useNavigate, useRoutes, useParams } from "react-router-dom";



type IVerticalFeatureRowProps = {
  title: string | undefined;
  description: string;
  image: string;
  imageAlt: string;
  reverse?: boolean;
};

const VerticalFeatureRow = (props: IVerticalFeatureRowProps) => {

 const router = useNavigate();

 const handleNavigationToHome = () => {
    router("/spotify");
  };

console.log(props.image);

  return (
    <div className="flex flex-wrap items-center mt-20">
      <div className="w-full sm:w-1/2 text-center sm:px-6">
        <h3 className="text-3xl text-gray-900 font-semibold">{props.title}</h3>
        <div className="mt-6 text-xl leading-9">{props.description}</div>
      </div>

      <div className="w-full sm:w-1/2 p-6">
    
        <img src={props.image}></img>
      </div>
    </div>
  );
};

export { VerticalFeatureRow };
