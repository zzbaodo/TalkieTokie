import React, { useState, useContext, useEffect, useRef } from "react"
import firebase from "../firebase"
import "firebase/firestore"
import ChatMessage from "../components/ChatMessage"
import "./ChatRoom.css"
import UserContext from "../context/user/userContext"
import MessageContext from "../context/message/messageContext"

const ChatRoom = () => {
  const db = firebase.firestore()
  const userContext = useContext(UserContext)
  const userFromLocal = JSON.parse(localStorage.getItem("user"))
  const { currentChannel, signUserOut } = userContext
  const messageContext = useContext(MessageContext)
  const { messagesArr, loading, displayChatRoom } = messageContext
  const [chatMessage, setChatMessage] = useState("")
  // console.log(messagesArr.length)
  const endOfMessage = useRef()
  const scrollToBottom = () => {
    endOfMessage.current.scrollIntoView({ behavior: "smooth" })
  }
  useEffect(() => {
    if (currentChannel) {
      displayChatRoom(currentChannel)
    }
    scrollToBottom()
    // eslint-disable-next-line
  }, [currentChannel])

  const submitHandler = async (e) => {
    e.preventDefault()
    const { uid, photoURL } = userFromLocal
    const dataRef = db
      .collection(`channels`)
      .doc(currentChannel)
      .collection(`${currentChannel}messages`)
    await dataRef.add({
      text: chatMessage,
      createdAt: Date.now(),
      uid,
      userImage: photoURL,
    })
    displayChatRoom(currentChannel)
    setChatMessage("")
  }

  return (
    <>
      <div className="chat-panel-container">
        {currentChannel ? (
          <>
            <h2 style={{ textAlign: "center" }} className="room-title">
              {currentChannel}{" "}
            </h2>
            <div className="form-input">
              <>
                {messagesArr && loading === false ? (
                  messagesArr.map((msg) => (
                    <ChatMessage
                      key={msg.id}
                      text={msg.text}
                      photoURL={msg.userImage}
                      createdAt={msg.createdAt}
                      id={msg.uid}
                    />
                  ))
                ) : (
                  <p>Still waiting</p>
                )}
              </>
            </div>
            <form className="form-container">
              <input
                type="text"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
              />
              <button onClick={submitHandler}>Send</button>
              <br />
            </form>
            <div ref={endOfMessage} className='scroll'/>
          </>
        ) : (
          <h3>Please select a channel</h3>
        )}
      </div>
    </>
  )
}

export default ChatRoom
