import React from "react"
import "./ChatMessage.css"
const ChatMessage = ({ createdAt, text, photoURL, id }) => {
  const user = JSON.parse(localStorage.getItem("user"))
  const CSSClass = user?.uid === id ? "message-owner" : ""
  return (
    <div className={`message-container ${CSSClass}`}>
      <div className={`text-image-container ${CSSClass}`}>
        <p className="message-sent">{text}</p>
        <img src={photoURL} alt="User avatar" className="user-avatar" />
      </div>
    </div>
  )
}

export default ChatMessage
