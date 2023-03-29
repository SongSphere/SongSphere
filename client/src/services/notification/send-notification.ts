import { TNotification } from "../../types/notification";



const sendNotification = async (
    notification: TNotification
    ) => {
    console.log(notification.notificationType);
    console.log("sendNotification in client/services");
    console.log(notification);
    await fetch(`${process.env.REACT_APP_API}/api/post/notification`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({
            notificationForAlerts: notification
        }),
        headers: {
            "Content-Type": "application/json",
        },
    }).catch((error) => {
        console.log(error);
    });
    
}

export default sendNotification;