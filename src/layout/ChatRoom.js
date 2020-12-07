import React, { useState, useContext, useEffect } from "react"
import firebase from "../firebase"
import "firebase/firestore"
import ChatMessage from "../components/ChatMessage"
import "./ChatRoom.css"
import UserContext from "../context/user/userContext"
import { displayChatRoom, getChatRoom } from "../Utils"
const ChatRoom = () => {
  const auth = firebase.auth()
  const db = firebase.firestore()
  const userContext = useContext(UserContext)
  const userFromLocal = JSON.parse(localStorage.getItem("user"))
  const { currentChannel } = userContext

  const [chatMessage, setChatMessage] = useState("")
  const [messagesArr, setMessageArr] = useState([])
  console.log(currentChannel)
  // const messageCollection = db.collection(`${currentChannel}messages`)
  // const query = messageCollection.orderBy("createdAt").limit(25)
  // const [messages] = useCollectionData(query, { idField: "id" })
  
  useEffect(() => {
    if (currentChannel) {
      displayChatRoom(currentChannel, userFromLocal.uid)
      getChatRoom(currentChannel).then((data) => setMessageArr(data))
    }
  }, [currentChannel, userFromLocal.uid,setMessageArr])
  console.log(messagesArr)


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
            <h3>Chat Room</h3>
            <div>
              {messagesArr &&
                messagesArr.map((msg) => (
                  <ChatMessage
                    key={msg.id}
                    text={msg.text}
                    photoURL={msg.userImage}
                    createdAt={msg.createdAt}
                    id={msg.uid}
                  />
                ))}
            </div>
            <form >
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
