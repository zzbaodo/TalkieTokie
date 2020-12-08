import { DISPLAY_CHAT_ROOM, UPON_CHANGE_CHANNEL } from "../types"
// eslint-disable-next-line
export default (state, action) => {
  switch (action.type) {
    case UPON_CHANGE_CHANNEL:
      return {
        ...state,
        activeChannel: action.payload,
        messagesArr: [],
      }

    case DISPLAY_CHAT_ROOM:
        console.log(state.messagesArr)
      return {
        messagesArr: [...state.messagesArr, ...action.payload.data],
        activeChannel: action.payload.activechannel,
        loading: false,
      }

    default:
      return {
        ...state,
      }
  }
}
