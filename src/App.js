import React, { Component } from 'react';
import './App.css';
import './Loader.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      apiKey: "fc05c9fdbe7159bbb7865e7a0758f727",
      error: null,
      isLoaded: false,
      items: [null, null, null, null]
    };
  }

  getData() {
    fetch("https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&limit=1&user=ikuzomi&api_key="+this.state.apiKey+"&format=json")
      .then(res => res.json())
      .then(
        (result) => {
          this.state.items[0] = result.recenttracks;
          this.forceUpdate();
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )

    fetch("https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&limit=1&user=mazemagic&api_key=fc05c9fdbe7159bbb7865e7a0758f727&format=json")
      .then(res => res.json())
      .then(
        (result) => {
          this.state.items[1] = result.recenttracks;
          this.forceUpdate();
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )

    fetch("https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&limit=1&user=roo_220&api_key=fc05c9fdbe7159bbb7865e7a0758f727&format=json")
      .then(res => res.json())
      .then(
        (result) => {
          this.state.items[2] = result.recenttracks;
          this.forceUpdate();
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )

    fetch("https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&limit=1&user=bkrpage94&api_key=fc05c9fdbe7159bbb7865e7a0758f727&format=json")
      .then(res => res.json())
      .then(
        (result) => {
          this.state.items[3] = result.recenttracks;
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
              <div key={item['@attr'].user} className="line-item">
                <a target="_blank" href={'https://www.last.fm/user/'+item['@attr'].user}>{item['@attr'].user}</a> <span><img alt="" src={item.track[0].image[1]['#text']}/> {item.track[0].artist['#text']} - {item.track[0].name}</span> 
              </div>
            ))}
          </div>
        );
      }
      else
      {
        return <div className="loader">Loading...</div>
      }
    }
  }
}

export default App;