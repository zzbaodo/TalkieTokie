import React, { useContext, useState } from "react"
import "./UserInfo.css"
import StarsIcon from "@material-ui/icons/Stars"
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline"
import { IconButton } from "@material-ui/core"
import LibraryAddIcon from "@material-ui/icons/LibraryAdd"
import UserContext from "../context/user/userContext"
import Modal from "../components/Modal"
import ChannelDisplay from "../components/ChannelDisplay"
import ExitToAppIcon from "@material-ui/icons/ExitToApp"
import firebase from "../firebase"
import "firebase/firestore"

const UserInfo = ({ channels, favorites }) => {
  const auth = firebase.auth()
  const user = JSON.parse(localStorage.getItem("user"))
  const userContext = useContext(UserContext)
  const [showModal, setShowModal] = useState(false)
  const [config, setConfig] = useState(null)
  const { getUserOption, signUserOut } = userContext
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
  const signOut = () => {
    auth.signOut()
    localStorage.removeItem("user")
    signUserOut()
  }

  return (
    <div className="userInfo-container">
      {showModal && config && (
        <Modal userId={user.uid} closeModal={closeModal} config={config} />
      )}
      <div className="userInfo-top">
        <h1 style={{ margin: "3px", padding: "5px" }}>TalkieTokie</h1>
        <div className="user-container">
          <img src={user?.photoURL} className="avatar" />
          <h2
            style={{
              margin: "3px",
              padding: "5px",
              color: "#658ec6",
              fontWeight: "700",
              opacity: "0.8",
            }}
          >
            {user?.displayName}
          </h2>
          <div className="signout">
            <h4>Sign Out</h4>
            <IconButton
              style={{ color: "#151515" }}
              onClick={signOut}
              className="icon"
            >
              <ExitToAppIcon />
            </IconButton>
          </div>
        </div>
        <hr />
      </div>
      <div className="favorite-header">
        <StarsIcon style={{ color: "#151515" }} />
        <h3>Favorite Channels:</h3>
      </div>
      <ul>
        {favorites
          ? favorites.map((favorite) => (
              <ChannelDisplay channel={favorite} type="fav" key={favorite} />
            ))
          : null}
      </ul>
      <hr />
      <div className="channel-header">
        <div className="icon-channel-wrapper">
          <LibraryAddIcon style={{ color: "#151515" }} />
          <h3>Channels</h3>
        </div>
        <IconButton style={{ color: "#151515" }} onClick={addChannel}>
          <AddCircleOutlineIcon />
        </IconButton>
      </div>
      <div className="channelList">
        <ul>
          {channels
            ? channels.map((channel) => (
                <ChannelDisplay channel={channel} key={channel} />
              ))
            : null}
        </ul>
      </div>
    </div>
  )
}

export default UserInfo
