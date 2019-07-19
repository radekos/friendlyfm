import React from "react"

const RecentTrack = (props) => {
  const { user, currentlyListening, image, artist, trackName, handleRemove } = props
  return (
    <div key={user} className="row">
      <a target="_blank" href={'https://www.last.fm/user/' + user} className="col-3">
        {user}
      </a>
      <span className="col-6">
      {artist} - {trackName}
      {!currentlyListening &&
        <span role="img" aria-label="Muted Speaker"> 🔇</span>
      }
      </span>
      <div className="col-3">
        <img alt="" src={image} width="40px" height="40px" />
      </div>

      <div className="col-3">
        <button className="btn red" type="button" onClick={() => handleRemove(user)}>Delete</button>
      </div>

    </div>
  )
}

export default RecentTrack