import React, { useState, useContext, useEffect } from "react"
import firebase from "../firebase"
import "firebase/firestore"
import ChatMessage from "../components/ChatMessage"
import "./ChatRoom.css"
import UserContext from "../context/user/userContext"
import MessageContext from "../context/message/messageContext"

const ChatRoom = () => {
  const auth = firebase.auth()
  const db = firebase.firestore()
  const userContext = useContext(UserContext)
  const userFromLocal = JSON.parse(localStorage.getItem("user"))
  const { currentChannel } = userContext
  const messageContext = useContext(MessageContext)
  const { messagesArr, loading, displayChatRoom } = messageContext
  const [chatMessage, setChatMessage] = useState("")
  // console.log(messagesArr.length)

  useEffect(() => {
    if (currentChannel) {
      displayChatRoom(currentChannel)
    }
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
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      userImage: photoURL,
    })
    setChatMessage("")
  }

  const signOut = () => {
    auth.signOut()
    localStorage.removeItem("user")
  }
  return (
    <>
      <div className="chat-panel-container">
        {currentChannel ? (
          <>
            <h3>Welcome to {currentChannel} Chat Room</h3>
            <div>
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
            </div>
            <form>
              <input
                type="text"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
              />
              <button onClick={submitHandler}>Send</button>
            </form>
            <button onClick={signOut}>Sign Out</button>
          </>
        ) : (
          <h3>Please select a channel</h3>
        )}
      </div>
    </>
  )
}

export default ChatRoom
