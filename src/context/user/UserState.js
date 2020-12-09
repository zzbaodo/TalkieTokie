import React, { useReducer, useContext } from "react"
import {
  ADD_CHANNEL,
  USER_CHANNEL_OPTION,
  GET_USER_INFO,
  ADD_FAVORITE_CHANNEL,
  DELETE_CHANNEL,
  DELETE_FAVORITE_CHANNEL,
  SIGN_USER_OUT,
} from "../types"
import UserContext from "./userContext"
import userReducer from "./userReducer"
import firebase from "../../firebase"
import MessageContext from "../message/messageContext"
const UserState = (props) => {
  const initState = {
    currentChannel: "react",
    userChannels: [],
    userFavChannels: [],
    user: {
      name: "",
      id: null,
      avatar: "",
    },
  }
  const [state, dispatch] = useReducer(userReducer, initState)
  const db = firebase.firestore()
  const messageContext = useContext(MessageContext)
  const { uponChangeChannel } = messageContext
  ///ACTIONS
  const getUserInfo = async (userId, name) => {
    const userRef = db.collection("user").doc(userId)
    const doc = await userRef.get()
    if (!doc.exists) {
      //If the user is new then set up that user
      const info = {
        channels: ["react"],
        favorites: [],
        user: {
          name,
          id: userId,
          avatar: "",
        },
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
    const channelsRef = db.collection("channels").doc("react")
    const channelDoc = await channelsRef.get()
    if (!doc.exists) {
      await channelsRef.set({
        users: [userId],
      })
    } else {
      //Add all users to a selected channel
      const currentUsersInChannel = channelDoc.data()
      console.log(currentUsersInChannel.users)
      const index = currentUsersInChannel.users.indexOf(userId)
      console.log(index)
      if (index === -1) {
        await channelsRef.update({
          users: [...currentUsersInChannel.users, userId],
        })
      }
    }
  }

  const getUserOption = (currentChannel) => {
    dispatch({
      type: USER_CHANNEL_OPTION,
      payload: currentChannel,
    })
    uponChangeChannel(currentChannel)
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
      await channelsRef.update({
        users: [...currentUsersInChannel.users, userId],
      })
    }
    const userRef = db.collection("user").doc(userId)
    const userDoc = await userRef.get()
    const userData = userDoc.data()
    if (userData.channels.indexOf(channel) === -1) {
      const updatedChannelsList = [...userData.channels, channel]
      await userRef.update({
        channels: [...updatedChannelsList],
      })
      dispatch({
        type: ADD_CHANNEL,
        payload: updatedChannelsList,
      })
    } else {
      alert("Channel already exists")
    }
  }

  const addFavChannel = async (channel, userId) => {
    //Add user to a selected channel
    const userRef = db.collection("user").doc(userId)
    const userDoc = await userRef.get()
    const userData = userDoc.data()
    if (userData.favorites.indexOf(channel) === -1) {
      const updatedChannelsList = [...userData.favorites, channel]
      console.log(updatedChannelsList)
      await userRef.update({
        favorites: [...updatedChannelsList],
      })
      dispatch({
        type: ADD_FAVORITE_CHANNEL,
        payload: updatedChannelsList,
      })
    } else {
      alert("Channel already been added")
    }
  }
  const deleteChannel = async (channel, userId) => {
    // First remove the channel from user doc
    const userRef = db.collection("user").doc(userId)
    const userDoc = await userRef.get()
    const userData = userDoc.data()
    const index = userData.channels.indexOf(channel)
    userData.channels.splice(index, 1)
    await userRef.update({
      channels: [...userData.channels],
    })
    dispatch({
      type: DELETE_CHANNEL,
      payload: [...userData.channels],
    })
    if(userData.favorites.indexOf(channel) !== -1){
      deleteFavChannel(channel, userId)
    }

    //Second remove the user from channel doc
    console.log(channel)
    const channelRef = db.collection("channels").doc(channel)
    const channelDoc = await channelRef.get()
    const channelData = channelDoc.data()
    console.log('delete Channel')
    const indexChannel = channelData.users.indexOf(userId)
    channelData.users.splice(indexChannel, 1)
    await channelRef.update({
      users: [...channelData.users],
    })
  }

  const deleteFavChannel = async (channel, userId) => {
    const userRef = db.collection("user").doc(userId)
    const userDoc = await userRef.get()
    const userData = userDoc.data()
    const index = userData.favorites.indexOf(channel)
    userData.favorites.splice(index, 1)
    console.log('delete fav channel')
    await userRef.update({
      favorites: [...userData.favorites],
    })
    dispatch({
      type: DELETE_FAVORITE_CHANNEL,
      payload: [...userData.favorites],
    })
  }

  const signUserOut = () => {
    dispatch({
      type: SIGN_USER_OUT,
    })
  }
  return (
    <UserContext.Provider
      value={{
        currentChannel: state.currentChannel,
        userChannels: state.userChannels,
        userFavChannels: state.userFavChannels,
        user: state.user,
        getUserOption,
        addChannel,
        addFavChannel,
        getUserInfo,
        deleteChannel,
        deleteFavChannel,
        signUserOut
      }}
    >
      {props.children}
    </UserContext.Provider>
  )
}
export default UserState
