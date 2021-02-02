import React, { useContext } from "react"
import "./ChannelDisplay.css"
import { IconButton } from "@material-ui/core"
import StarRateIcon from "@material-ui/icons/StarRate"
import UserContext from "../context/user/userContext"
import DeleteIcon from "@material-ui/icons/Delete"

const ChannelDisplay = ({ channel, type }) => {
  const userContext = useContext(UserContext)
  const {
    getUserOption,
    addFavChannel,
    user,
    deleteChannel,
    deleteFavChannel,
  } = userContext
  const changeChannel = (channel) => {
    getUserOption(channel)
  }
  return (
    <div className="channelDisplay">
      <p classname="channelText" onClick={() => changeChannel(channel)}>
        {channel}
      </p>
      <div className="channelDisplay__icon-container">
        {type === "fav" ? null : (
          <IconButton onClick={() => addFavChannel(channel, user.id)}>
            <StarRateIcon style={{ color: "#fff58a" }} />
          </IconButton>
        )}
        <IconButton
          onClick={
            type !== "fav"
              ? () => deleteChannel(channel, user.id)
              : () => deleteFavChannel(channel, user.id)
          }
        >
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
  )
}

export default ChannelDisplay
