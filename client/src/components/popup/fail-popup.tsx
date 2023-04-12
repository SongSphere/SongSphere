import Popup from "reactjs-popup";

interface ISucessFailPopUpProps {
  failText: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const FailPopUp = (props: ISucessFailPopUpProps) => {
  return (
    <Popup
      open={props.open}
      closeOnDocumentClick
      onClose={() => {
        props.setOpen(false);
      }}
    >
      <div className="h-screen bg-blue">
        <div className="w-full mt-96 modal">
          <div className="px-4 py-2 text-white border-2 rounded-full w-fit bg-slate-900/70">
            {props.failText}
          </div>
        </div>
      </div>
    </Popup>
  );
};

export default FailPopUp;
