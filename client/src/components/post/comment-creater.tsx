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
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState<string[]>([]);
  const [stringToRemove, setStringToRemove] = useState<string>("");
  const [startLookingLocation, setStartLookingLocation] = useState<number>(0);

  useEffect(() => {
    if (props.user) {
      if (props.user.followers) {
        setFollowers(props.user.followers);
      }
    }
  }, [props.user]);


  const handleDropdownSelection = (
    nameSelected: React.SetStateAction<string>
  ) => {
    // Handle dropdown selection
    const newCommentContent = commentContent.replace(stringToRemove, "");
    setStringToRemove(""); // reset the string to remove
    setCommentContent(newCommentContent + "" + nameSelected); // Auto fill
    setSearchTerm("");
    setShowDropdown(false);
    setFilteredOptions([]);
    setStartLookingLocation(commentContent.length);
    console.log(startLookingLocation);
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

            //onChange={handleInputChange}
            onChange={async (event) => {
              /*
                This functionality calls to backend for User Document
              */
              if ((event.target.value as string) === "") {
                setShowDropdown(false);
              } else if ((event.target.value as string) !== "") {
                const value = event.target.value;
                setCommentContent(value);

                const valueToMatch = value.slice(startLookingLocation);
                // Step 3: Apply regular expression to extracted substring
                const regex = /@(\S+)/; // Replace with your desired regular expression
                const match = valueToMatch.match(regex);

                if (match && match[1]) {
                  const selectedItem = match[1]; // Extract string after "@" symbol
                  setShowDropdown(true);

                  setSearchTerm(selectedItem); // search term is the matched string

                  const filtered = followers.filter((option) =>
                    option.includes(selectedItem)
                  );

                  setFilteredOptions(filtered); // sets to only show the item with matched string
                  setStringToRemove(selectedItem);


                  setSearchTerm("");
                } else {
                  setShowDropdown(false);
                }
              }
            }}
          />
        </div>
        {showDropdown && (
          <ul className="w-[40%] mt-3 mx-auto">
            {filteredOptions.map((s) => (
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
