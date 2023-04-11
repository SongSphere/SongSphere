import { useEffect, useState } from "react";
import Popup from "reactjs-popup";

interface ISucessFailPopUpProps {
  sucessFailText: string;
}

const SucessFailPopUp = (props: ISucessFailPopUpProps) => {
  const [open, setOpen] = useState(false);

  const close = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (props.sucessFailText != "") {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [props.sucessFailText]);

  return (
    <Popup open={open} closeOnDocumentClick onClose={close}>
      <div className="h-screen bg-blue">
        <div className="w-full mt-96 modal">
          <div className="px-4 py-2 text-white border-2 rounded-full w-fit bg-slate-900/70">
            {props.sucessFailText}
          </div>
        </div>
      </div>
    </Popup>
  );
};

export default SucessFailPopUp;
