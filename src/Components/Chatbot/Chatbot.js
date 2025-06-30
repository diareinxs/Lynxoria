import React, { useState } from "react";
import "./Chatbot.css";
import lynxoriaLogo from '../Lynxoria Logos.png';
import sentIcon from '../sent.png';
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

// Custom function to convert markdown-style lists with '*' to HTML lists
const convertMarkdownListToHTML = (text) => {
  const lines = text.split('\n');
  let inList = false;
  let html = '';
  lines.forEach((line) => {
    if (line.trim().startsWith('* ')) {
      if (!inList) {
        inList = true;
        html += '<ul>';
      }
      const item = line.trim().substring(2);
      html += `<li>${item}</li>`;
    } else {
      if (inList) {
        inList = false;
        html += '</ul>';
      }
      html += `<p>${line}</p>`;
    }
  });
  if (inList) {
    html += '</ul>';
  }
  return html;
};

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! How can I assist you with books today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // Function to parse book details from bot message text
  const parseBookDetails = (text) => {
    const details = {};
    const lines = text.split('\n');
    lines.forEach(line => {
      const lowerLine = line.toLowerCase();
      if (lowerLine.startsWith('author:')) {
        details.author = line.substring(7).trim();
      } else if (lowerLine.startsWith('publisher:')) {
        details.publisher = line.substring(10).trim();
      } else if (lowerLine.startsWith('publisher date:')) {
        details.publisherDate = line.substring(15).trim();
      } else if (lowerLine.startsWith('rating:')) {
        details.rating = line.substring(7).trim();
      }
    });
    return details;
  };

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
        {messages.map((msg, index) => {
          const bookDetails = msg.sender === "bot" ? parseBookDetails(msg.text) : null;
          return (
            <div
              key={index}
              className={`chatbot-message ${
                msg.sender === "user" ? "user-message" : "bot-message"
              }`}
            >
              {msg.sender === "bot" ? (
                <>
                  <div
                    dangerouslySetInnerHTML={{ __html: convertMarkdownListToHTML(msg.text) }}
                    className="bot-message-content"
                  />
                  {bookDetails && (
                    <div className="book-details">
                      {bookDetails.author && <div><strong>Author:</strong> {bookDetails.author}</div>}
                      {bookDetails.publisher && <div><strong>Publisher:</strong> {bookDetails.publisher}</div>}
                      {bookDetails.publisherDate && <div><strong>Publisher Date:</strong> {bookDetails.publisherDate}</div>}
                      {bookDetails.rating && <div><strong>Rating:</strong> {bookDetails.rating}</div>}
                    </div>
                  )}
                </>
              ) : (
                msg.text
              )}
            </div>
          );
        })}
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
          <img src={sentIcon} alt="Send" className="chatbot-send-icon" />
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
