import React from "react"
import firebase from "./firebase"

const ChatRoom = ({ user }) => {
  const auth = firebase.auth()
  console.log(auth)
  return (
    <h3>
      Chat Chat
      {user && <button onClick={() => auth.signOut()}>Sign Out</button>}
    </h3>
  )
}

export default ChatRoom
