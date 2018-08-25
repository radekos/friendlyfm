import React from 'react'

const RecentTrack = ({ user, image, artist, songName }) => {
  return (
    <div key={user} className="line-item">
      <span>{user}</span> 
      <span>
        <img alt="" src={image}/> 
        {artist} - {songName}
      </span> 
    </div>
  )
}

export default RecentTrack