import { useEffect, useState } from "react";
import AddInvitation from "../../services/party/add-invitation";
import { TUser } from "../../types/user";
import Session from "../../session";
import sendNotification from "../../services/notification/send-notification";
import removeInvitation from "../../services/party/remove-invitation";
import { TPartyRoom } from "../../types/party-room";
import { TNotification } from "../../types/notification";
import fetchUserByUsername from "../../services/user/fetch-user-username";
import SendInvitationEmail from "../../services/party/send-invitation-email";

interface ISearchUserForInviteProps {
  following: string[];
  roomId: string | undefined;
  room: TPartyRoom | null;
  isVisible: boolean;
  onClose: Function;
}

const SearchUserForInvite = (props: ISearchUserForInviteProps) => {
  const [following, setFollowing] = useState(props.following);
  const [isInvited, setIsInvited] = useState<Boolean>(false);
  const [user, setUser] = useState<TUser | null>(null);
  const [selectedUser, setSelectedUser] = useState<TUser | null>(null);

  const handleOnClose = (e: React.ChangeEvent<any>) => {
    if (e.target.id === "container") {
      setFollowing([]);
      setIsInvited(false);
      setSelectedUser(null);
      props.onClose();
    }
  };

  useEffect(() => {
    setUser(Session.getUser());
  }, [Session.getUser()]);

  useEffect(() => {
    setFollowing(props.following);
  }, [props.following]);

  if (!props.isVisible) {
    return null;
  }
  const handleInviteClick = async () => {
    if (isInvited) {
      setIsInvited(false);
    } else {
      setIsInvited(true);
    }
  };

  return (
    <div
      id="container"
      onClick={handleOnClose}
      className="fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm"
    >
      <div className="w-3/4 p-5 bg-white rounded max-h-[60vh] min-h-[60vh]">
        <h1 className="py-3 font-semibold text-center text-gray-900 border-b-4 border-solid border-b-lgrey">
          Search Invitation
        </h1>

        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="py-2">
            <div className="flex justify-between bg-white rounded-md shadow shadow-black/20">
              <input
                type="text"
                className="flex-1 block w-full px-3 py-2 focus:outline-none"
                placeholder="Search Username"
                onChange={async (event) => {
                  // setSelectedUser(event.target.value);

                  // searching

                  if ((event.target.value as string) === "") {
                    setFollowing([]);
                    setSelectedUser(null);
                  } else if ((event.target.value as string) !== "") {
                    let filteredUsers: Array<string> = Array<string>();
                    let filteredUsersStatus: Array<Boolean> = Array<Boolean>();

                    //  let fusers: Array<TUserInvite> = Array<TUserInvite>();

                    props.following.forEach((u) => {
                      if (u.startsWith(event.target.value as string)) {
                        filteredUsers.push(u);
                        filteredUsersStatus.push(false);
                        // if (props.room?.invitedMembers) {
                        //   props.room.invitedMembers.forEach((invitedUser) => {
                        //     if (invitedUser == u) {
                        //         setIsInvited(true);
                        //       //  filteredUsersStatus.push(true);
                        //     }
                        //   });
                        // }
                      }
                    });

                    setFollowing(filteredUsers);
                  }
                }}
              />
            </div>

            <div className="justify-center py-2 text-center">
              <div className="overflow-y-auto max-h-[45vh]">
                {following.length > 0 ? (
                  following.map((userName) => {
                    return (
                      <div className="flex">
                        <div className="flex-1 inline-block text-left">
                          <div>
                            <a className="flex items-center p-2 text-base font-normal ">
                              <svg
                                className="flex-shrink-0 w-6 h-6"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                              ></svg>
                              <button
                                className="flex-1 inline-block text-left"
                                onClick={async () => {
                                  await fetchUserByUsername(userName).then((res) => {
                                    if (res) {
                                      setSelectedUser(res);
                                      if (
                                        props.room &&
                                        props.room.invitedMembers
                                      ) {
                                        props.room.invitedMembers.forEach(
                                          (invitedUser) => {
                                            if (invitedUser == res.username) {
                                              console.log(`invitedUser: ${invitedUser} res.username: ${res.username}`);
                                              setIsInvited(true);
                                            }
                                          }
                                        );
                                      }
                                    }
                                  });

                            
                                  setFollowing([]);
                                   console.log(setIsInvited);
                                 
                                }}
                              >
                                {userName}
                              </button>
                            </a>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="px-3 py-2 cursor-pointer hover:bg-slate-100">
                    {selectedUser && (
                      <div className="flex items-center gap-2 mb-5">
                        <div className="w-14 h-14 rounded-full p-1 hover:scale-105 bg-blue-200/80 overflow-hidden">
                          <img
                            src={selectedUser.backgroundImgUrl}
                            alt=""
                            className="rounded-full w-full"
                          />
                        </div>
                        <div className="font-semibold text-blue-600 mr-auto">
                          <h2>{selectedUser.username}</h2>
                        </div>
                
                        <button
                            className="btn follow_friend px-4 py-2 bg-blue-700 text-slate-100 rounded-full text-sm font-semibold hover:bg-white border border-blue-700 hover:text-blue-700 shadow-md shadow-blue-700
"
                            onClick={async () => {
                              if (props.roomId) {
                                await AddInvitation(
                                  props.roomId,
                                  selectedUser.username
                                )
                                  .then(async (res) => {

                                  })
                                  .catch((err) => {
                                    alert(err);
                                  });

                                if (user) {
                                  const notificationForAlerts: TNotification = {
                                    userEmailSender: user.email,
                                    userEmailReceiver: selectedUser.email,
                                    notificationType: "Party",
                                    text: props.roomId,
                                  };

                                  await sendNotification(notificationForAlerts);

                                  await SendInvitationEmail(props.roomId, user.username, selectedUser.email);
                                  handleInviteClick();
                                  // send email
                                
                                }
                              }
                            }}
                          >
                            Invite
                          </button>

                          <button
                            className="btn follow_friend px-4 py-2 bg-blue-700 text-slate-100 rounded-full text-sm font-semibold hover:bg-white border border-blue-700 hover:text-blue-700 shadow-md shadow-blue-700
"
                            onClick={async () => {
                              if (props.roomId) {
                                await removeInvitation(
                                  props.roomId,
                                  selectedUser.username
                                );

                                handleInviteClick();
                              } else {
                                alert("The room does not exist");
                              }
                            }}
                          >
                            Uninvite
                          </button>
                  
                          
          
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchUserForInvite;
