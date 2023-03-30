export type TNotification = {
    _id?: string;
    userEmailSender: string;
    userEmailReceiver: string;
    notificationType: string;
    text: string;
};