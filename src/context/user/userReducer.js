import { ADD_CHANNEL, GET_USER_INFO, USER_CHANNEL_OPTION } from "../types"
// eslint-disable-next-line
export default (state, action) => {
  switch (action.type) {
    case USER_CHANNEL_OPTION:
      return {
        ...state,
        currentChannel: action.payload,
      }
    case ADD_CHANNEL:
      return {
        ...state,
        userChannels: [...action.payload],
      }
    case GET_USER_INFO:
      return {
        ...state,
        userChannels: action.payload.channels,
        userFavChannels: action.payload.favorites,
      }
    default:
      return {
        currentChannel: null,
      }
  }
}
