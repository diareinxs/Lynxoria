import React, { useState } from "react";
import "./Chatbot.css";

function Chatbot() {
    const [messages, setMessages] = useState([
        { text: "Hello! How can I help you?", sender: "bot" }
    ]);
    const [input, setInput] = useState("");

    const sendMessage = async () => {
        if (!input.trim()) return;
        setMessages([...messages, { text: input, sender: "user" }]);
        setInput("");
        // Simulate bot reply (replace with API call as needed)
        setTimeout(() => {
        setMessages(msgs => [
            ...msgs,
            { text: "This is a sample bot reply.", sender: "bot" }
        ]);
        }, 500);
    };

    return (
        <div className="chatbot-box">
        <div className="chatbot-messages">
            {messages.map((msg, idx) => (
            <div key={idx} className={`chatbot-msg ${msg.sender}`}>
                {msg.text}
            </div>
            ))}
        </div>
        <div className="chatbot-input-area">
            <input
            className="chatbot-input"
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && sendMessage()}
            placeholder="Type a message..."
            />
            <button className="chatbot-send" onClick={sendMessage}>
            Send
            </button>
        </div>
        </div>
    );
    }

    export default Chatbot;