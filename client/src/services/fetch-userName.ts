import { TUser, TUserWrapper } from "../types/user";

const fetchUserName = async (
    userName: string,
) => {

    let user = null;
    console.log(`Passed in the text box ${userName}`)
    await fetch(`${process.env.REACT_APP_API}/user/queryUserName`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({
            userName: userName,
          }),
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then(async (res) => {
            return res.json();
        })
        .then((data) => {
            user = (data.users as TUser);
        })
        .catch((error) => {
            throw error;
        })

        return user;
}

export default fetchUserName;