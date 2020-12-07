import React, { useContext, useState } from "react"
import "./UserInfo.css"
import StarsIcon from "@material-ui/icons/Stars"
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline"
import { IconButton } from "@material-ui/core"
import LibraryAddIcon from "@material-ui/icons/LibraryAdd"
import MailOutlineIcon from "@material-ui/icons/MailOutline"
import UserContext from "../context/user/userContext"
import Modal from "../components/Modal"

const UserInfo = ({ channels, favorites }) => {
  const user = JSON.parse(localStorage.getItem("user"))
  const userContext = useContext(UserContext)
  const [showModal, setShowModal] = useState(false)
  const { getUserOption } = userContext
  const changeChannel = (name) => {
    getUserOption(name)
    console.log("clicked")
  }

  const closeModal = () => {
    setShowModal(false)
  }
  const favModalConfig = {
    name: "Add Favorite Channel",
  }
  const addChannel = () => {
    setShowModal(true)
  }
  const addFavChannel = () => {
    setShowModal(true)
  }

  return (
    <div className="userInfo-container">
      {showModal && (
        <Modal userId={user.uid} closeModal={closeModal}  />
      )}
      <h3>TalkieTokie</h3>
      <h5>Hello {user.displayName}</h5>
      <hr />
      <div>
        <h3>
          <StarsIcon />
          Favorite Channels:
        </h3>
        <IconButton onClick={addFavChannel}>
          <AddCircleOutlineIcon />
        </IconButton>
      </div>
      <ul>
        {favorites
          ? favorites.map((favorite) => (
              <li key={favorite} onClick={() => changeChannel(favorite)}>
                {favorite}
              </li>
            ))
          : null}
      </ul>
      <hr />
      <div>
        <h3>
          <LibraryAddIcon />
          Channels
        </h3>
        <IconButton onClick={addChannel}>
          <AddCircleOutlineIcon />
        </IconButton>
      </div>

      <ul>
        {channels
          ? channels.map((channel) => (
              <li key={channel} onClick={() => changeChannel(channel)}>
                {channel}
              </li>
            ))
          : null}
      </ul>
      <hr />
      <div>
        <h3>
          <MailOutlineIcon />
          Direct Messages:
        </h3>
      </div>
      <ul>
        <li>John</li>
        <li>Brad</li>
      </ul>
    </div>
  )
}

export default UserInfo
