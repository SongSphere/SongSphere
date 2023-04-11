import { useEffect, useState } from "react";
import Popup from "reactjs-popup";

interface ISucessFailPopUpProps {
  successFailText: string;
}

const SucessFailPopUp = (props: ISucessFailPopUpProps) => {
  const [open, setOpen] = useState(false);

  const close = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (props.successFailText == "Error") {
      setOpen(true);
    }
  }, [props.successFailText]);

  return (
    <Popup open={open} closeOnDocumentClick onClose={close}>
      <div className="modal">
        <a className="close" onClick={close}>
          &times;
        </a>
        <div className="px-4 py-2 border-2 rounded-lg bg-slate-200">
          {props.successFailText}
        </div>
      </div>
    </Popup>
  );
};

export default SucessFailPopUp;
