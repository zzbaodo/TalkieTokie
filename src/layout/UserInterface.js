import React, { useEffect, useContext } from "react"
import ChatRoom from "./ChatRoom"
import UserInfo from "./UserInfo"
import ChannelInfo from "./ChannelInfo"
import "./UserInterface.css"

import UserContext from "../context/user/userContext"

const UserInterface = () => {
  const userContext = useContext(UserContext)
  const { userChannels, userFavChannels, getUserInfo } = userContext

  const user = JSON.parse(localStorage.getItem("user"))
  const { displayName, uid } = user
  useEffect(() => {
    getUserInfo(uid, displayName)
  }, [displayName, uid,getUserInfo])

  return (
    <div className="UI-container">
      <UserInfo channels={userChannels} favorites={userFavChannels} />
      <ChatRoom />
      <ChannelInfo />
    </div>
  )
}

export default UserInterface
