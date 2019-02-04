import React, { Component } from 'react';
import './App.css';
import './Loader.css';
import User from './components/User'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      apiKey: "fc05c9fdbe7159bbb7865e7a0758f727",
      users: [],
      hasContent: false,
      mainUser: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ mainUser: this.element.value });
    this.getData(this.element.value);
    this.interval = setInterval(() => this.getData(this.state.mainUser), 5000);
  }

  goBack() {
    this.setState({hasContent: false})
  }

  getData(user)
  {
    fetch("https://ws.audioscrobbler.com/2.0/?method=user.getfriends&user=" + user + "&api_key=" + this.state.apiKey + "&format=json&recenttracks=1")
    .then(result => result.json())
    .then(
      (result) => {

        if (result.friends != null)
        {
          this.setState({ users: result.friends.user, hasContent: true})
        }
        else
        {
          this.setState({ hasContent: true })
        }
      }
    )
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() 
  {
    if (!this.state.hasContent)
    {
      return (
        <div>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="userInput">Last.fm Username</label>
              <input type="text" className="form-control" id="userInput" ref={el => this.element = el} placeholder="Username"/>
              <small id="emailHelp" className="form-text">See what your friends are listening to.</small>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      )
    }
    else
    {
      if (this.state.users != null && this.state.users.length > 0)
      {
        return (
          <div className="container-fluid">
              {this.state.users.map(user => (
                <div key={user.name}>
                  <User
                    user={user}
                  />
                </div>
              ))}
          </div>
        )
      }
      else
      {
        return (
          <div>
            <p id="noFriends">>You have no friends</p>
            <button className="btn btn-primary" onClick={this.goBack}>fuck go back</button>
          </div>
        )
      }
    }
  }
}

export default App;