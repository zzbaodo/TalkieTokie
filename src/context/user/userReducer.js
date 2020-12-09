import {
  ADD_CHANNEL,
  ADD_FAVORITE_CHANNEL,
  DELETE_CHANNEL,
  GET_USER_INFO,
  USER_CHANNEL_OPTION,
  SIGN_USER_OUT,
  DELETE_FAVORITE_CHANNEL,
} from "../types"
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
    case DELETE_CHANNEL:
      return {
        ...state,
        userChannels: [...action.payload],
      }
    case DELETE_FAVORITE_CHANNEL:
      return {
        ...state,
        userFavChannels: [...action.payload],
      }
    case ADD_FAVORITE_CHANNEL:
      return {
        ...state,
        userFavChannels: [...action.payload],
      }
    case GET_USER_INFO:
      return {
        ...state,
        userChannels: action.payload.channels,
        userFavChannels: action.payload.favorites,
        user: { ...action.payload.user },
      }
    case SIGN_USER_OUT:
      return {
        currentChannel: "react",
        userChannels: [],
        userFavChannels: [],
        user: {
          name: "",
          id: null,
          avatar: "",
        },
      }
    default:
      return {
        currentChannel: null,
      }
  }
}
