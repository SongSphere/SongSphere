import mongoose, { Schema } from "mongoose";

export interface INotification {
    id?: string;
    userEmailSender: string;
    userEmailReceiver: string;
    notificationType: string;
    text: string;
    
}

const NotificationSchema = new Schema<INotification>(
    {
        id: {
            type: String,
            required: false,
          },
        userEmailSender: {
            type: String,
            required: true,
        },
        userEmailReceiver: {
            type: String,
            required: true,
        },
        notificationType: {
            type: String,
            required: true,
        },
        text: {
            type: String,
            required: true,
        }
        

    },
    {
        timestamps: true,
    }
);

const Notifications = mongoose.model<INotification>("Notification", NotificationSchema);
export default Notifications;