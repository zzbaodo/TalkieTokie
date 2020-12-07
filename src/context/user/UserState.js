import React, { useReducer } from "react"
import { ADD_CHANNEL, USER_CHANNEL_OPTION, GET_USER_INFO } from "../types"
import UserContext from "./userContext"
import userReducer from "./userReducer"
import firebase from "../../firebase"
const UserState = (props) => {
  const initState = {
    currentChannel: "react",
    userChannels: [],
    userFavChannels: [],
  }
  const [state, dispatch] = useReducer(userReducer, initState)
  const db = firebase.firestore()
  ///ACTIONS
  const getUserInfo = async (userId, name) => {
    const userRef = db.collection("user").doc(userId)
    const doc = await userRef.get()
    if (!doc.exists) {
      //If the user is new then set up that user
      const info = {
        channels: ["react", "JS"],
        favorites: [],
        avatar: "",
        name,
      }
      userRef.set(info)
      dispatch({
        type: GET_USER_INFO,
        payload: info,
      })
    } else {
      dispatch({
        type: GET_USER_INFO,
        payload: doc.data(),
      })
    }
  }

  const getUserOption = (name) => {
    dispatch({
      type: USER_CHANNEL_OPTION,
      payload: name,
    })
  }

  const addChannel = async (channel, userId) => {
    const channelsRef = db.collection("channels").doc(channel)
    const doc = await channelsRef.get()
    if (!doc.exists) {
      await channelsRef.set({
        users: [userId],
      })
    } else {
      //Add all users to a selected channel
      const currentUsersInChannel = doc.data()
      console.log(currentUsersInChannel)
      await channelsRef.update({
        users: [...currentUsersInChannel.users, userId],
      })
    }
    const userRef = db.collection("user").doc(userId)
    const userChannels = await userRef.get()
    const channelsList = userChannels.data()
    const updatedChannelsList = [...channelsList.channels, channel]
    console.log(updatedChannelsList)
    await userRef.update({
      channels: [...updatedChannelsList],
    })
    dispatch({
      type: ADD_CHANNEL,
      payload: updatedChannelsList,
    })
  }

  return (
    <UserContext.Provider
      value={{
        currentChannel: state.currentChannel,
        userChannels: state.userChannels,
        userFavChannels: state.userFavChannels,
        getUserOption,
        addChannel,
        getUserInfo,
      }}
    >
      {props.children}
    </UserContext.Provider>
  )
}
export default UserState
