import { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000'); 

const ChatBox = () => {

    const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
  }, []);

  const sendMessage = () => {
    if (newMessage.trim()) {
      socket.emit('send-message', newMessage);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: newMessage, sender: 'You' },
      ]);
      setNewMessage('');
    }
  };

  return (
    <div className="flex justify-center items-start min-h-screen">
      <div className="bg-white h-[700px] w-[600px] rounded-lg pt-3 flex flex-col shadow-2xl">
        <div className="p-4 flex flex-col h-full">
          {/* Messages Section */}
          <div className="flex-1 overflow-y-auto p-2 space-y-2">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg ${
                  msg.sender === 'You' ? 'bg-black text-white ml-auto' : 'bg-gray-200 text-gray'
                } break-words`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* Input Section */}
          <div className="mt-4 flex items-center">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="rounded-l-md p-2 w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Type your message"
            />
            <button
              onClick={sendMessage}
              className="bg-black text-white p-2 rounded-r-md hover:bg-red focus:outline-none ml-2"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatBox