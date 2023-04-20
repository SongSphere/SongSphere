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
  roomId: string;
  room: TPartyRoom | null;
  isVisible: boolean;
  onClose: Function;
}

const SearchUserForInvite = (props: ISearchUserForInviteProps) => {
  const [following, setFollowing] = useState<string[]>([]);
  const [isInvited, setIsInvited] = useState<Boolean>(false);
  const [user, setUser] = useState<TUser | null>(null);
  const [selectedUser, setSelectedUser] = useState<TUser | null>(null);

  const handleOnClose = (e: React.ChangeEvent<any>) => {
    if (e.target.id === "container") {
      setSelectedUser(null);
      props.onClose();
    }
  };

  useEffect(() => {
    setFollowing(Session.getUser()?.following || []);
  }, []);

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
                  if ((event.target.value as string) === "") {
                    setFollowing(Session.getUser()?.following || []);
                    setSelectedUser(null);
                  } else if ((event.target.value as string) !== "") {
                    let filteredUsers: Array<string> = Array<string>();
                    following.forEach((u) => {
                      if (u.startsWith(event.target.value as string)) {
                        filteredUsers.push(u);
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
                                  await fetchUserByUsername(userName).then(
                                    (res) => {
                                      if (res) {
                                        setSelectedUser(res);
                                        if (
                                          props.room &&
                                          props.room.invitedMembers
                                        ) {
                                          props.room.invitedMembers.forEach(
                                            (invitedUser) => {
                                              if (invitedUser == res.username) {
                                                setIsInvited(true);
                                              }
                                            }
                                          );
                                        }
                                      }
                                    }
                                  );

                                  setFollowing([]);
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
                        <div className="p-1 overflow-hidden rounded-full w-14 h-14 hover:scale-105 bg-blue-200/80">
                          <img
                            src={selectedUser.backgroundImgUrl}
                            alt=""
                            className="w-full rounded-full"
                          />
                        </div>
                        <div className="mr-auto font-semibold text-blue-600">
                          <h2>{selectedUser.username}</h2>
                        </div>

                        <button
                          className="px-4 py-2 text-sm font-semibold bg-blue-700 border border-blue-700 rounded-full shadow-md btn follow_friend text-slate-100 hover:bg-white hover:text-blue-700 shadow-blue-700 "
                          onClick={async () => {
                            if (props.roomId) {
                              await AddInvitation(
                                props.roomId,
                                selectedUser.username
                              )
                                .then(async (res) => {})
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

                                await SendInvitationEmail(
                                  props.roomId,
                                  user.username,
                                  selectedUser.email
                                );
                                handleInviteClick();
                                // send email
                              }
                            }
                          }}
                        >
                          Invite
                        </button>

                        <button
                          className="px-4 py-2 text-sm font-semibold bg-blue-700 border border-blue-700 rounded-full shadow-md btn follow_friend text-slate-100 hover:bg-white hover:text-blue-700 shadow-blue-700 "
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
