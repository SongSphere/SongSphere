import { useEffect, useState } from "react";
import sendNotification from "../../services/notification/send-notification";
import sendComment from "../../services/post/send-comment";
import { TComment } from "../../types/comment";
import { TNotification } from "../../types/notification";
import { TUser } from "../../types/user";

interface ICommentCreatorProp {
  user: TUser;
  id: string;
  commentType: string; // this can be "Post" or "Comment"
  commentChanged: number;
  setCommentChanged: React.Dispatch<React.SetStateAction<number>>;
  commentCreatorEmail: string;
}

const CommentCreater = (props: ICommentCreatorProp) => {
  let [commentContent, setCommentContent] = useState("");
  const [followers, setFollowers] = useState<string[]>([]);

  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (props.user) {
      if (props.user.followers) {
        setFollowers(props.user.followers);
      }
    }
  }, [props.user]);

  const handleInputChange = (e: { target: { value: any } }) => {
    const value = e.target.value;
    setCommentContent(value);

    // Detect "@" symbol
    if (value.includes("@") && value.endsWith("@")) {
      setShowDropdown(true);
      // Fetch or update dropdown data based on input value
      // e.g. fetch usernames from API or filter suggestions from local data
    } else {
      setShowDropdown(false);
    }
  };

  const handleDropdownSelection = (
    selectedItem: React.SetStateAction<string>
  ) => {
    // Handle dropdown selection
    setCommentContent(commentContent + "" + selectedItem);
    setShowDropdown(false);
  };

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        let res = false;
        if (props.user && commentContent !== "") {
          const comment: TComment = {
            username: props.user.username,
            userEmail: props.user.email,
            text: commentContent,
            subComments: [],
            like: 0,
          };

          if (props.commentType === "Post") {
            res = await sendComment(comment, props.id, "");

            if (props.user.email !== props.commentCreatorEmail) {
              const notificationForAlerts: TNotification = {
                userEmailSender: props.user.email,
                userEmailReceiver: props.commentCreatorEmail,
                notificationType: "Comment",
                text: `${props.user.username} commented on your post!`,
              };
              await sendNotification(notificationForAlerts);
            }
          } else if (props.commentType === "Comment") {
            res = await sendComment(comment, "", props.id);

            if (props.user.email !== props.commentCreatorEmail) {
              const notificationForAlerts: TNotification = {
                userEmailSender: props.user.email,
                userEmailReceiver: props.commentCreatorEmail,
                notificationType: "Comment",
                text: `${props.user.username} commented on your comment!`,
              };

              await sendNotification(notificationForAlerts);
            }
          }
        }

        if (res) {
          setCommentContent("");
          props.setCommentChanged(props.commentChanged + 1);
        }
      }}
    >
      <label>
        <div className="flex px-2">
          <img
            className="w-12 h-12 border rounded-full"
            src={props.user.profileImgUrl}
          ></img>
          <input
            className="w-full pl-4 mx-2 border rounded-full"
            type="text"
            placeholder="Type ur comment here!"
            name="name"
            value={commentContent}
            onChange={handleInputChange}
          />
        </div>
        {showDropdown && (
          <ul className="w-[40%] mt-3 mx-auto">
            {followers.map((s) => (
              <div className="grid w-full grid-flow-col">
                <button
                  className="w-full text-center bg-white border-2 border-solid text-navy border-lblue hover:text-gray-400 hover:text-lg"
                  key={s}
                  onClick={() => handleDropdownSelection(s)}
                >
                  <div className="flex text-center w-[75%]">{s}</div>
                </button>
              </div>
            ))}
          </ul>
        )}
      </label>
    </form>
  );
};

export default CommentCreater;
