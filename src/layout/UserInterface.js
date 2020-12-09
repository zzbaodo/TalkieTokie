import React, { useEffect, useContext } from "react"
import ChatRoom from "./ChatRoom"
import UserInfo from "./UserInfo"
import "./UserInterface.css"

import UserContext from "../context/user/userContext"

const UserInterface = () => {
  const userContext = useContext(UserContext)
  const { userChannels, userFavChannels, getUserInfo } = userContext

  const user = JSON.parse(localStorage.getItem("user"))

  useEffect(() => {
    if (user) {
      const { displayName, uid } = user
      getUserInfo(uid, displayName)
    }
  }, [])
  return (
    <div className="UI-container">
      <UserInfo channels={userChannels} favorites={userFavChannels} />
      <ChatRoom />
      
    </div>
  )
}

export default UserInterface
