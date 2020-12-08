import React, { useContext, useState, useEffect } from "react"
import "./ChannelInfo.css"
import firebase from "../firebase"
import UserContext from "../context/user/userContext"
const ChannelInfo = () => {
  const db = firebase.firestore()
  const [users, setUsers] = useState(null)
  const userContext = useContext(UserContext)

  const { currentChannel,user } = userContext
  const getAllUsersInChannel = async () => {
    const channelRef = db.collection("channels").doc(currentChannel)
    const channelDoc = await channelRef.get()
    if (!channelDoc.exists) {
        await channelRef.set({
          users: user.id,
        })
        setUsers(user.name)
    }else{
     console.log(channelDoc.data())
    }
  }
  useEffect(() => {
    getAllUsersInChannel()
  }, [currentChannel])

  return <div className="channelInfo-container">Chat InFO</div>
}

export default ChannelInfo
