import React, { useReducer } from "react"
import { DISPLAY_CHAT_ROOM, UPON_CHANGE_CHANNEL } from "../types"
import MessageContext from "./messageContext"
import messageReducer from "./messageReducer"
import firebase from "../../firebase"
const MessageState = (props) => {
  const initState = {
    messagesArr: [],
    loading: true,
    activeChannel: "",
  }
  const [state, dispatch] = useReducer(messageReducer, initState)
  const db = firebase.firestore()

  // ACTIONS
  const displayChatRoom = async (currentChannel) => {
    await db
      .collection(`channels`)
      .doc(currentChannel)
      .collection(`${currentChannel}messages`)
      .orderBy("createdAt")
      .onSnapshot((collectionSnapshot) => {
        const changes = collectionSnapshot.docChanges()
        
        const data = changes.map((doc) => doc.doc.data())
        dispatch({
          type: DISPLAY_CHAT_ROOM,
          payload: { data, activechannel: currentChannel },
        })
        console.log(data)
       
      })
  }
  const uponChangeChannel = (currentChannel) => {
    dispatch({
      type: UPON_CHANGE_CHANNEL,
      payload: currentChannel,
    })
  }

  return (
    <MessageContext.Provider
      value={{
        messagesArr: state.messagesArr,
        loading: state.loading,
        displayChatRoom,
        uponChangeChannel,
      }}
    >
      {props.children}
    </MessageContext.Provider>
  )
}
export default MessageState
