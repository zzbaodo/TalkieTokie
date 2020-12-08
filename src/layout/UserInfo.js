import React, { useContext, useState } from "react"
import "./UserInfo.css"
import StarsIcon from "@material-ui/icons/Stars"
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline"
import { IconButton } from "@material-ui/core"
import LibraryAddIcon from "@material-ui/icons/LibraryAdd"
import MailOutlineIcon from "@material-ui/icons/MailOutline"
import UserContext from "../context/user/userContext"
import Modal from "../components/Modal"
import ChannelDisplay from "../components/ChannelDisplay"

const UserInfo = ({ channels, favorites }) => {
  const user = JSON.parse(localStorage.getItem("user"))
  const userContext = useContext(UserContext)
  const [showModal, setShowModal] = useState(false)
  const [config, setConfig] = useState(null)
  const { getUserOption } = userContext
  const changeChannel = (name) => {
    getUserOption(name)
  }
  const closeModal = () => {
    setShowModal(false)
  }

  const addChannel = () => {
    setShowModal(true)
    setConfig({
      name: "Add a channel",
      type: "normal",
    })
  }
  // const addFavChannel = () => {
  //   setShowModal(true)
  //   setConfig({
  //     name: "Add a favorite channel",
  //     type: "favorite",
  //   })
  // }

  return (
    <div className="userInfo-container">
      {showModal && config && (
        <Modal userId={user.uid} closeModal={closeModal} config={config} />
      )}
      <h3>TalkieTokie</h3>
      <h5>Hello {user.displayName}</h5>
      <hr />
      <div>
        <h3>
          <StarsIcon />
          Favorite Channels:
        </h3>
      </div>
      <ul>
        {favorites
          ? favorites.map((favorite) => (
            <ChannelDisplay channel={favorite} type= 'fav' key={favorite} />
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
              <ChannelDisplay channel={channel} key={channel} />
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
