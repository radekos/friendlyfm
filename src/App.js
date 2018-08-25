import React, { Component } from 'react';
import './App.css';
import RecentTrack from './components/RecentTracks';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      apiKey: "fc05c9fdbe7159bbb7865e7a0758f727",
      users: ["ikuzomi", "mazemagic", "roo_220", "bkrpage94"],
      error: null,
      isLoaded: false,
      items: []
    };
  }

  getData(user) {
    fetch("https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&limit=1&user="+user+"&api_key="+this.state.apiKey+"&format=json")
      .then(res => res.json())
      .then(
        (result) => {
          this.state.items.push(result.recenttracks);
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


    this.interval = setInterval(() => this.state.users.forEach(user => {this.state.items=[]; this.getData(user);  }), 5000);


  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { error, isLoaded, items } = this.state;

    if (error) 
    {
      return <div>ERROR: {error.message}</div>;
    }
    else
    {
      var isReady = true;
      
      items.map(item => {
        if (item == null)
        {
          isReady = false;
        }
      });

      if (isReady)
      {
        return (
          <div>
            {items.map(item => (
              <RecentTrack
                user={item['@attr'].user}
                image={item.track[0].image[1]['#text']}
                artist={item.track[0].artist['#text']}
                songName={item.track[0].name}
              />
            ))}
          </div>
        );
      }
      else
      {
        return <div>Loadingu...</div>;
      }
    }
  }
}

export default App;