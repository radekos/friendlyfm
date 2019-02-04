import React from "react"
import RecentTrack from "./RecentTrack"

class User extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      apiKey: "fc05c9fdbe7159bbb7865e7a0758f727",
      error: null,
      item: this.props.user,
    }
  }

  //Check if each user is listening
  isCurrentlyListening(track) {
    //Need to check the date has a value
    if (track != null) {

      let timeInMs = parseInt(track['@attr'].uts);
      let date = new Date();
      let currentTime = date.getTime();

      if (currentTime > timeInMs + 60000) {
        return false;
      }
    }
    else {
      return true;
    }
  }

  render() {
    const { item } = this.state

    return (
      <div className="line-item">
        {
          <RecentTrack
            user={item.name}
            currentlyListening={this.isCurrentlyListening(item.recenttrack)}
            image={""}
            artist={item.recenttrack.artist.name}
            trackName={item.recenttrack.name}
          />
        }
        </div>

    )
  }
}

export default User