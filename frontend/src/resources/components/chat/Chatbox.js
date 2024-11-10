import React, { useState } from "react";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import NavigationRoundedIcon from "@mui/icons-material/NavigationRounded";
import { ReactComponent as AppChatIcon } from "../../media/chat/app_chat.svg";

function ChatBox() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState([
    { user: "system", text: "Hello! Ask me anything!" },
  ]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = () => {
    if (message.trim() !== "") {
      setConversation([...conversation, { user: "user", text: message }]);
      setMessage("");
    }
  };

  return (
    <>
      {isOpen ? (
        <div className="fixed bottom-5 right-5 bg-[#E9F0FF] rounded-lg shadow-lg w-96 h-96 flex flex-col justify-between z-50">
          <div className="flex relative items-center p-3 border-b border-gray-200 bg-[#6078DF] rounded-t-lg overflow-hidden">
            <div className="absolute">
              <AppChatIcon sx={{ color: "white" }} />
            </div>
            <div className="flex items-center w-full justify-between ml-20">
              <h3 className="font-medium text-base text-white">Chat</h3>
              <button onClick={toggleChat}>
                <ClearOutlinedIcon sx={{ color: "#ECECEC" }} />
              </button>
            </div>
          </div>

          <div className="flex-1 p-3 overflow-y-auto">
            {conversation.map((msg, index) => (
              <div
                key={index}
                className={`mb-2 ${
                  msg.user === "user" ? "text-right" : "text-left"
                }`}
              >
                <p
                  className={`inline-block px-4 py-2 rounded-lg text-white font-medium text-[15px] leading-5 ${
                    msg.user === "user" ? "bg-[#6078DF]" : "bg-[#1A184C]"
                  }`}
                >
                  {msg.text}
                </p>
              </div>
            ))}
          </div>

          <div className="flex items-center p-3 border-t border-gray-200">
            <textarea
              className="flex-1 resize-none border-0 focus:outline-none px-3 py-2 bg-white rounded-full text-black font-medium text-base"
              rows={1}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask your question..."
            />
            <button
              onClick={handleSendMessage}
              className="ml-3 text-white p-2 rounded-full transition"
            >
              <NavigationRoundedIcon
                sx={{ color: "#6078DF", rotate: "90deg" }}
              />
            </button>
          </div>
        </div>
      ) : (
        <button
          className="fixed bottom-5 right-5 shadow-lg transition z-50"
          onClick={toggleChat}
        >
          <div className="rounded-full bg-[#FFFFFF40] p-1">
            <AppChatIcon sx={{ color: "white" }} />
          </div>
        </button>
      )}
    </>
  );
}

export default ChatBox;
