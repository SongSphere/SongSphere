import Navbar from "../components/navbar";
import { TUser } from "../types/user";
import Session from "../session";
import { useEffect, useState } from "react";
import NotificationCard from "../components/notification/comment-notification-card";
import { TNotification } from "../types/notification";
import fetchNotificationsByEmailAddress from "../services/post/fetch-user-notifications";

const NotificationPage = () => {
  const [user, setUser] = useState<TUser | null>();
  const [notifications, setNotifications] = useState<TNotification[]>([]);

  useEffect(() => {
    setUser(Session.getUser());
  }, [Session.getUser()]);

  useEffect(() => {
    const fetchNotification = async () => {
      if (user) {
        fetchNotificationsByEmailAddress(user.email).then((notifications) => {
          setNotifications(notifications);
        });
      }
    };

    fetchNotification();
    const interval = setInterval(fetchNotification, 5000);
    return () => clearInterval(interval);
  }, [user]);

  if (!user) {
    return <div>fetching user</div>;
  }

  return (
    <div>
      <Navbar />

      <div
        className="absolute right-0 z-10 w-full h-full overflow-x-hidden transition duration-700 ease-in-out transform translate-x-0"
        id="notification"
      >
        <div className="right-0 h-screen p-8 overflow-y-auto  bg-navy">
          <div className="flex items-center justify-between">
            <p className="text-2xl font-semibold leading-6 text-white">
              Notifications
            </p>
            <div className="cursor-pointer">
              {/* there was on click */}
              <svg
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 6L6 18"
                  stroke="#4B5563"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6 6L18 18"
                  stroke="#4B5563"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {notifications.length > 0 ? (
            <div>
              {notifications.map((notification) => {
                return (
                  <NotificationCard
                    sender={notification.userEmailSender}
                    text={notification.text}
                    type={notification.notificationType}
                  />
                );
              })}

              <div className="flex items-center justify-between">
                <hr className="w-full" />
                <p className="flex flex-shrink-0 px-3 py-16 text-sm leading-normal text-white">
                  Thats it for now :)
                </p>
                <hr className="w-full" />
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <hr className="w-full" />
              <p className="flex flex-shrink-0 px-3 py-16 text-sm leading-normal text-white">
                You are all caught up :)
              </p>
              <hr className="w-full" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationPage;
