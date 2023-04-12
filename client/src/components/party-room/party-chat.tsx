import { useEffect, useRef, useState } from "react";

const PartyRoomChat = () => {
  const [messages, setMessages] = useState([
    { sender: "user", content: "Hello" },
    { sender: "other", content: "Hi" },
  ]);
  const [messageInput, setMessageInput] = useState("");

  const chatContainerRef = useRef<HTMLDivElement>(null);

  const sendMessage = () => {
    if (messageInput.trim() === "") return;
    setMessages([...messages, { sender: "user", content: messageInput }]);
    setMessageInput("");
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="relative flex h-[60%] justify-center ">
      <div className="absolute bg-white rounded-lg w-[90%] h-full drop-shadow-md">
        <div className="pt-3 mb-2 text-2xl font-bold text-gray-700 pl-7">
          Chat
        </div>
        <div className="w-[95%] mx-auto border-b-2 border-gray-300"></div>
        <div className="flex flex-col h-[calc(100%-3rem)] p-2 pb-4">
          <div className="flex-grow p-2 overflow-y-auto" ref={chatContainerRef}>
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-1 rounded-md pl-3 py-1 ${
                  message.sender === "user"
                    ? "bg-sky-800 text-white"
                    : "bg-gray-300 text-gray-700"
                }`}
              >
                <div className="text-sm font-semibold">{message.sender}</div>
                <div className="pl-2 text-sm">{message.content}</div>
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
                  e.preventDefault(); // Prevent the default behavior of submitting the form
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
