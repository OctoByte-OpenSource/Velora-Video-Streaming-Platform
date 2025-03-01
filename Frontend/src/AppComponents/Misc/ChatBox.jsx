import {
  MESSAGE_ROOM,
  NEW_MESSAGE_ALERT,
  ROOM_JOIN_ALERT,
  ROOM_LEFT_ALERT,
} from "@/constants/socketEvent";
import { useSocketEventListner } from "@/hooks/hook";
import { getSocket } from "@/socket";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Message from "./Message";

const ChatBox = ({ peopleCount }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const roomName = useParams().id;

  const socket = getSocket();

  const roomJoinAlertHandler = ({ name }) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        content: `${name} has joined the Room`,
        sender: { username: "Admin" },
      },
    ]);
  };
  const roomLeftAlertHandler = ({ name }) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        content: `${name} has left the Room`,
        sender: { username: "Admin" },
      },
    ]);
  };

  const socketEvents = {
    [ROOM_JOIN_ALERT]: roomJoinAlertHandler,
    [ROOM_LEFT_ALERT]: roomLeftAlertHandler,
  };
  useSocketEventListner(socket, socketEvents);
  useEffect(() => {
    socket?.on(MESSAGE_ROOM, ({ serverMessage, forRoom }) => {
      if (forRoom !== roomName) return;
      console.log(serverMessage);
      setMessages((prevMessages) => [...prevMessages, serverMessage]);
    });
    return () => {
      socket?.off(MESSAGE_ROOM, ({ serverMessage }) => {
        console.log(serverMessage);
        setMessages((prevMessages) => [...prevMessages, serverMessage]);
      });
    };
  }, []);

  const sendMessage = () => {
    if (newMessage.trim()) {
      socket.emit(MESSAGE_ROOM, { roomName, message: newMessage });
      setNewMessage("");
    }
  };

  return (
    <div className="   ">
      <div className="bg-white h-[90vh]  sm:w-[250px] md:w-[350px] mb-10 rounded-lg pt-3 flex flex-col shadow-2xl">
        <p className=" text-center">watch Party chats</p>
        <div className="p-4 flex flex-col h-full">
          {/* Messages Section */}
          <div className="flex-1 max-h-[75vh] overflow-y-auto p-2 space-y-2">
            {messages.map((msg, index) => (
              <Message key={index} message={msg} />
            ))}
          </div>

          {/* Input Section */}
          <div className=" p-2 flex items-center">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="rounded-l-md p-2 w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Type your message"
            />
            <button
              onClick={sendMessage}
              className="bg-blue-600 text-white p-2 rounded-r-md hover:bg-red focus:outline-none ml-2"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
