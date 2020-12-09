import React, { useContext, useState, useEffect } from "react"
import "./ChannelInfo.css"
import firebase from "../firebase"
import UserContext from "../context/user/userContext"
const ChannelInfo = () => {
  const db = firebase.firestore()
  const [users, setUsers] = useState(null)
  const userContext = useContext(UserContext)

  const { currentChannel, user } = userContext
  const getAllUsersInChannel = async () => {
    const channelRef = db.collection("channels").doc(currentChannel)
    const channelDoc = await channelRef.get()
    if (!channelDoc.exists) {
      await channelRef.set({
        users: { id: user.id, name: user.name },
      })
      console.log("getalluserin channel run1")
      setUsers(user.name)
    } else {
      const currentUsers = channelDoc.data().users
      setUsers(currentUsers)
      console.log("getalluserin channel run 2")
    }
  }
  useEffect(() => {
    getAllUsersInChannel()
  }, [currentChannel])

  return (
    <div className="channelInfo-container">
      Chat Info
      <ul></ul>
    </div>
  )
}

export default ChannelInfo
