import React from "react"
import RecentTrack from "./RecentTrack"

class User extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      apiKey: "fc05c9fdbe7159bbb7865e7a0758f727",
      error: null,
      item: this.props.user,
      handleRemove: this.props.handleRemove
    }
  }

  //Check if each user is listening
  isCurrentlyListening(track) {
    //Need to check the date has a value
    if (track) {
      let timeInMs = parseInt(track, 10);
      let date = new Date();
      let currentTime = date.getTime();

      if (currentTime > timeInMs + 60000) {
        return false;
      }
    }

    return true;
  }

  render() {
    const { item } = this.state

    if (item.recenttrack)
    {
      return (
        <div className="line-item">
          {
            <RecentTrack
              user={item.name}
              currentlyListening={this.isCurrentlyListening(item.recenttrack.date)}
              image={item.recenttrack.imageName}
              artist={item.recenttrack.artistName}
              trackName={item.recenttrack.name}
              handleRemove={this.state.handleRemove}
            />
          }
          </div>
  
      )
    }
    
    return null;
  }
}

export default User