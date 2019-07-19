import React from "react"
import '../css/user.css'

const RecentTrack = (props) => {
  const { user, avatar, image, artist, trackName, handleRemove } = props
  return (
    <div key={user} className="recenttrack-row">

      <div className="first-column">
        <a className="name" target="_blank" href={'https://www.last.fm/user/' + user} >
          {user}
        </a>
      
        <button className="btn red deleteButton" type="button" onClick={() => handleRemove(user)}>Delete</button>
      </div>

      <div className="second-column">
        <div>
          <img alt="" src={image} className="icon"/>
        </div>
        <div className="title">
          <div className="artist">{artist}</div> {trackName}
        </div>
      </div>
    </div>
  )
}

export default RecentTrack