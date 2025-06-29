import React, { useState } from "react";
import "./Chatbot.css";
import roboticsIcon from '../robotics.png';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! How can I assist you today?" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message
    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setInput("");

    // Placeholder for API call to get bot response
    setTimeout(() => {
      const botResponse = "This is a placeholder response from the Gemini API.";
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: botResponse },
      ]);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">Lynxoria</div>
      <div className="chatbot-messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chatbot-message ${
              msg.sender === "user" ? "user-message" : "bot-message"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="chatbot-input-container">
        <input
          type="text"
          placeholder="Type your message here.."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          className="chatbot-input"
        />
        <button className="chatbot-send-button" onClick={handleSend}>
          <img 
            src={roboticsIcon} 
            alt="Send" 
            style={{ width: "20px", height: "20px" }} 
          />
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
