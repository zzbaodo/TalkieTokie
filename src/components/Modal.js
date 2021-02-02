import React, { useState, useContext } from "react"
import "./Modal.css"

import UserContext from "../context/user/userContext"
const Modal = ({ userId, closeModal, config }) => {
  const userContext = useContext(UserContext)

  const [channel, setChannel] = useState("")

  const addChannelHandler = async () => {
    if (config.type === "normal") {
      userContext.addChannel(channel, userId)
    } else {
      userContext.addFavChannel(channel, userId)
    }
    closeModal()
  }
  return (
    <div className="modal">
      <h2>{config.name}</h2>
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
