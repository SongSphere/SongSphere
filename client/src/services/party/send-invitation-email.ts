const SendInvitationEmail = async (
  roomId: string,
  senderUsername: string,
  receiverEmail: string
) => {
  return new Promise<boolean>(async (resolve, reject) => {
    try {
      await fetch(`${process.env.REACT_APP_API}/api/sendInvitationEmail`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({
          roomId: roomId,
          senderUsername: senderUsername,
          receiverEmail: receiverEmail,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        if (res.status == 201) {
          resolve(true);
        } else {
          reject(false);
        }
      });
    } catch (err) {
      console.error(err);
      reject(err);
    }
  });
};

export default SendInvitationEmail;
