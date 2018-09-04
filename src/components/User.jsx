import React from "react"
import RecentTrack from "./RecentTrack"

class User extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      apiKey: "fc05c9fdbe7159bbb7865e7a0758f727",

      error: null,
      isLoaded: false,
      item: {}
    }
  }

  getData() {
    console.log("Fetching data for: ", this.props.user)
    fetch("https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&limit=1&user=" + this.props.user + "&api_key=" + this.state.apiKey + "&format=json")
      .then(res => res.json())
      .then(
        (result) => {
          console.log("Result: ", result)
          this.setState({
            item: result.recenttracks,
            isLoaded: true
          })
          this.forceUpdate();
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  componentDidMount() {
    this.interval = setInterval(() => this.getData(), 5000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }


  //Check if each user is listening
  isCurrentlyListening(track) {
    //Need to check the date has a value
    if (track[0].date != null) {

      let timeInMs = parseInt(track[0].date.uts);
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
    const { item, isLoaded } = this.state

    return (
      <div className="line-item">
        {isLoaded ?
          <RecentTrack
            user={item['@attr'].user}
            currentlyListening={this.isCurrentlyListening(item.track)}
            image={item.track[0].image[1]['#text']}
            artist={item.track[0].artist['#text']}
            trackName={item.track[0].name}
          />
          :
          <div className="loader">Loading...</div>
        
        }
        </div>

    )
  }
}

export default User