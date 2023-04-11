import { useEffect, useState } from "react";
import AddInvitation from "../../services/party/add-invitation";
import { TUser } from "../../types/user";
import Session from "../../session";
import sendNotification from "../../services/notification/send-notification";
import fetchRoomById from "../../services/party/fetch-room-by-id";
import removeInvitation from "../../services/party/remove-invitation";
import { TPartyRoom } from "../../types/party-room";
import { TNotification } from "../../types/notification";
import fetchUserByUsername from "../../services/user/fetch-user-username";

interface IFollowingListProps {
  following: string[];
  roomId: string;
  room: TPartyRoom | null;
  isVisible: boolean;
  onClose: Function;
}

const FollowingListForInvite = (props: IFollowingListProps) => {
  const [following, setFollowing] = useState(props.following);
  const [isInvited, setIsInvited] = useState(false);
  const [room, setRoom] = useState<TPartyRoom | null>(null);
  const [user, setUser] = useState<TUser | null>(null);


  const handleOnClose = (e: React.ChangeEvent<any>) => {
    if (e.target.id === "container") {
      setFollowing(props.following);
      props.onClose();
    }
  };

  useEffect(() => {
    setUser(Session.getUser());
  }, [Session.getUser()]);


  useEffect(() => {
    setFollowing([]);
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
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm"
    >
      <div className="w-1/4 p-5 bg-white rounded max-h-[60vh] min-h-[60vh]">
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
                  // searching

                  if ((event.target.value as string) === "") {
                    setFollowing([]);
                  } else if ((event.target.value as string) !== "") {
                    let filteredUsers: Array<string> = Array<string>();

                    props.following.forEach((u) => {
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
                    // if (props.room) {
                    //   props.room.invitedMembers.forEach((invitedUser) => {
                    //     if (invitedUser === userName) {
                    //       setIsInvited(true);
                    //     }
                    //   });
                    // } else {

                    //   console.log("props.room is null");
                    // }
                    fetchRoomById(props.roomId).then((res) => {
                      setIsInvited(false);
                      if (res) {
                        setRoom(res);
                        res.invitedMembers.forEach((invitedUser) => {
                          if (invitedUser === userName) {
                            setIsInvited(true);
                          }
                        });
                      } else {
                        alert("Room does not exist");
                      }
                    });

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
                              <span className="flex-1 inline-block text-left">
                                {userName}
                                {isInvited ? (
                                  <button
                                    className="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300"
                                    onClick={async () => {
                                      if (room) {
                                        await removeInvitation(room, userName);
                                        handleInviteClick();
                                      } else {
                                        console.log("The room does not exist");
                                      }

                      
                                      handleInviteClick();
                                    }}
                                  >
                                    Invited
                                  </button>
                                ) : (
                                  <button
                                    className="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300"
                                    onClick={async () => {
                                      await AddInvitation(
                                        props.roomId,
                                        userName
                                      );
                                      if (user) {
                                        const notificationForAlerts: TNotification = {
                                          userEmailSender: user.email,
                                          userEmailReceiver: (await fetchUserByUsername(userName)).email,
                                          notificationType: "Comment",
                                          text: `${user.username} invited you to a party!`,
                                        };
                                        await sendNotification(notificationForAlerts);
                                      }
                                      
                                      handleInviteClick();
                                      
                                    }}
                                  >
                                    Invite
                                  </button>
                                )}
                              </span>
                            </a>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="px-3 py-2 cursor-pointer hover:bg-slate-100">
                    <p className="text-sm font-medium text-gray-600"></p>
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

export default FollowingListForInvite;
