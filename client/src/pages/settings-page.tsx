/*
  
  Author: David Kim
  this is a page for settings page
  Contains modal, Calls Adjust Names Link to update toward DB
*/

import { useContext, useState } from "react";
import AdjustNamesLink from "../components/adjust-names-link";
import DeleteGoogleAcountLink from "../components/delete-google-account-link";
import { userSessionContext } from "../context/userSessionContext";


const SettingsPage = () => {
  const { isLoggedIn, setIsLoggedIn, user, setUser } =
    useContext(userSessionContext);
    const [open, setOpen] = useState(false);
    const closeModal = () => setOpen(false);
  

    const [userName, setUserName] = useState<string>(user?.userName ? user?.userName : "" );
    const [givenName, setGivenName] = useState<string>(user?.givenName ? user?.givenName : "");
    const [middleName, setMiddleName] = useState<string>(user?.middleName ? user?.middleName : "");
    const [familyName, setFamilyName] = useState<string>(user?.familyName ? user?.familyName : "");
    

  return (
    <div className="flex flex-wrap items-center mt-20">
      <div className="w-full sm:w-1/2 text-center sm:px-6">
        <h3 className="text-3xl text-gray-900 font-semibold">
          Settings for: {user?.givenName}
        </h3>
        <div className="mt-6 text-xl leading-9">
          Let's change your profile
        </div>
      </div>

      <div className="w-full sm:w-1/2 p-6">
      <input className="e-input" type="text" placeholder="Enter User Name" value={userName} onChange={(e) => setUserName(e.target.value)} />
      <input className="e-input" type="text" placeholder="Enter Given Name" value={givenName} onChange={(e) => setGivenName(e.target.value)}  />
      <input className="e-input" type="text" placeholder="Enter Middle Name" value={middleName} onChange={(e) => setMiddleName(e.target.value)} />
      <input className="e-input" type="text" placeholder="Enter Last Name" value={familyName} onChange={(e) => setFamilyName(e.target.value)} />
      <AdjustNamesLink
          
          username={userName}
          givenName={givenName}
          middleName={middleName}
          familyName={familyName}
        />

      <DeleteGoogleAcountLink/>
      <button> Next </button>

    
      </div>

    </div>
  );
};

export default SettingsPage;
