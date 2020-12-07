import React, { useState, useContext } from "react"
import "./Modal.css"
import firebase from "../firebase"
import UserContext from "../context/user/userContext"
const Modal = ({ userId, closeModal,config }) => {
  const db = firebase.firestore()
  const userContext = useContext(UserContext)

  const [channel, setChannel] = useState("")

  const addChannelHandler = async () => {
   userContext.addChannel(channel,userId)
    closeModal()
  }
  return (
    <div className="modal">
      <h3>Add a channel</h3>
      <input
        type="text"
        value={channel}
        onChange={(e) => setChannel(e.target.value)}
      />
      <button onClick={addChannelHandler}>Add</button>
    </div>
  )
}

export default Modal
