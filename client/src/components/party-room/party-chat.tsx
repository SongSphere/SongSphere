import { useEffect, useRef, useState } from "react";
import { TPartyRoom } from "../../types/party-room";
import { TChat } from "../../types/chat";
import { TUser } from "../../types/user";
import Session from "../../session";
import SendChat from "../../services/party/send-chat";
import fetchChatsById from "../../services/party/fetch-chats";
import FailPopUp from "../popup/fail-popup";

interface ISendChatProps {
  room: TPartyRoom;
}

const PartyRoomChat = (props: ISendChatProps) => {
  const [messages, setMessages] = useState<TChat[]>(props.room.chats);
  const [messageInput, setMessageInput] = useState("");
  const [failOpen, setFailOpen] = useState(false);
  const[user, setUser] = useState<TUser | null >(null);
  const mesRef = useRef<TChat[] | null> (null);

  useEffect(() => {
    const fetched = Session.getUser();
    setUser(fetched);
  }, [])

  const chatContainerRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
    
  }, [messages]);

useEffect(() => {
  let mounted = true;
  const updateMessages = async () => {
    let newMessages;
    if(props.room._id) {
      newMessages = await fetchChatsById(props.room._id.toString());
    }
    if(
      newMessages &&
      JSON.stringify(newMessages) !== JSON.stringify(mesRef.current) &&
      mounted
    ) {
      mesRef.current = newMessages;
      setMessages(newMessages);
    }
  };
  const interval = setInterval(updateMessages, 500);
  return () => {
    clearInterval(interval);
    mounted = false;
  }
}, [])
  const sendMessage = () => {
    if (messageInput.trim() === "") return;
    if(user) {
      const newChat: TChat = {
        sender: user.username,
        message: messageInput,
      };
      setMessageInput("");
      SendChat(props.room, newChat).then((res) => {
        if(!res) {
          <FailPopUp 
            open={failOpen}
            setOpen={setFailOpen}
            failText="Error sending message try again"
          />
        }
      })
      setMessages([...messages, newChat]);
    }
    
    
  };
  return (
    <div className="w-full px-4 lg:h-72 h-96">
      <div className="h-full bg-white rounded-lg drop-shadow-md">
        <div className="pt-3 mb-2 text-2xl font-bold text-gray-700 pl-7">
          Chat
        </div>
        <div className="border-b-2 border-gray-300"></div>
        <div className="flex flex-col p-2 overflow-hidden max-h-[85%]">
          <div className="flex-grow p-2 overflow-y-auto" ref={chatContainerRef}>
            {messages?.map((message, index) => (
              <div
                key={index}
                className={`mb-1 rounded-md pl-3 py-1 ${
                  message.sender === user?.username
                    ? "bg-sky-800 text-white"
                    : "bg-gray-300 text-gray-700"
                }`}
              >
                <div className="text-sm font-semibold">{message.sender}</div>
                <div className="pl-2 text-sm">{message.message}</div>
              </div>
            ))}
          </div>
          <div className="flex items-center p-2">
            <input
              type="text"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  sendMessage();
                  e.preventDefault();
                }
              }}
              className="flex-grow p-1 mr-2 text-sm border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Type your message here"
            />
            <button
              onClick={sendMessage}
              className="px-4 py-1 font-bold text-white bg-blue-500 rounded-lg focus:outline-none focus:bg-blue-600"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PartyRoomChat;
