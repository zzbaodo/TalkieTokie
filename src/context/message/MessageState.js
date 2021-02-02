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
    const query = db
      .collection(`channels`)
      .doc(currentChannel)
      .collection(`${currentChannel}messages`)
      .orderBy("createdAt", "desc")
      .limit(20)
    const data = await query.get()
    let res = []
    data.forEach((doc) => {
      const docData = {
        ...doc.data(),
        id: doc.id,
      }
      res.push(docData)
    })
    dispatch({
      type: DISPLAY_CHAT_ROOM,
      payload: { res, activechannel: currentChannel },
    })
  }

  ////
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
