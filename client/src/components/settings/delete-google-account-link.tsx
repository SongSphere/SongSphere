import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteGoogleAccount from "../../services/user/delete-google-account";
import Session from "../../session";
import FailPopUp from "../popup/fail-popup";

/*
 * This is used in the settings page to modify username, givenName, middleName, and Family_name
 * Author: David Kim
 */

interface IDeleteGoogleAcountLinkProps {}

const DeleteGoogleAcountLink = (props: IDeleteGoogleAcountLinkProps) => {
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
        className="p-2 rounded-lg bg-slate-300"
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
