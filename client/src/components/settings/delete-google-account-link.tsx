import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteGoogleAccount from "../../services/user/delete-google-account";
import Session from "../../session";
import FailPopUp from "../popup/fail-popup";

const DeleteGoogleAcountLink = () => {
  const [deleteFailOpen, setDeleteFailOpen] = useState(false);
  const DELETE_ACC_ERR_MSG =
    "Oops! An error occurs when you try to delete your account. Try again later!";

  const [email, setEmail] = useState<string | null>(null);

  let navigate = useNavigate();

  useEffect(() => {
    const user = Session.getUser();
    if (user) {
      setEmail(user.email);
    }
  }, [Session.getUser()]);

  if (!email) {
    return <div>fetching user</div>;
  }

  return (
    <div>
      <button
        className="px-2 py-1 bg-red-300 rounded-lg"
        onClick={async () => {
          const confirmDelete = window.confirm(
            "Are you sure you want to delete your account? This operation cannot be redone."
          );
          if (confirmDelete) {
            DeleteGoogleAccount(email)
              .then((res) => {
                Session.setUser(null);
                Session.setIsLoggedIn(false);
                navigate("/auth");
              })
              .catch((err) => {
                setDeleteFailOpen(true);
              });
          }
        }}
      >
        Delete account
      </button>

      <FailPopUp
        open={deleteFailOpen}
        setOpen={setDeleteFailOpen}
        failText={DELETE_ACC_ERR_MSG}
      />
    </div>
  );
};

export default DeleteGoogleAcountLink;
