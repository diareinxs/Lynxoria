import React, { useState } from "react";
import "./Chatbot.css";
import lynxoriaLogo from '../Lynxoria Logos.png';
import { GoogleGenAI } from "@google/genai";

import { GEMINI_API_KEY } from "../../config";

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

// Utility function to parse URLs in text and return an array of React elements with clickable links
const parseTextWithLinks = (text) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = text.split(urlRegex);
  return parts.map((part, index) => {
    if (urlRegex.test(part)) {
      return (
        <a
          key={index}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="chatbot-link"
        >
          {part}
        </a>
      );
    } else {
      return part;
    }
  });
};

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! How can I assist you with books today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const callGeminiAPI = async (userInput) => {
    // Limit the chatbot to books only by prepending a directive in the prompt
    const promptText = `Answer only about books. User query: ${userInput}`;

    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [
          {
            parts: [
              {
                text: promptText,
              },
            ],
          },
        ],
      });

      const botText = response.text || "Sorry, I couldn't get a response.";
      return botText;
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      return "Sorry, there was an error processing your request.";
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message
    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    // Call Gemini API and get response
    const botResponse = await callGeminiAPI(input);

    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "bot", text: botResponse },
    ]);
    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <img src={lynxoriaLogo} alt="Bot Icon" className="chatbot-header-icon" />
        Lynxoria
      </div>
      <div className="chatbot-messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chatbot-message ${
              msg.sender === "user" ? "user-message" : "bot-message"
            }`}
          >
            {msg.sender === "bot" ? parseTextWithLinks(msg.text) : msg.text}
          </div>
        ))}
        {loading && (
          <div className="chatbot-message bot-message">
            Loading...
          </div>
        )}
      </div>
      <div className="chatbot-input-container">
        <input
          type="text"
          placeholder="Type your message here.."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          className="chatbot-input"
          disabled={loading}
        />
        <button className="chatbot-send-button" onClick={handleSend} aria-label="Send message" disabled={loading}>
          {/* Right arrow SVG icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-arrow-right"
            viewBox="0 0 24 24"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
