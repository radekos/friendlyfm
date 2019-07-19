import React, { Component } from 'react';
import './App.css';
import './Loader.css';
import User from './components/User';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

let hidden = null;
let visibilityChange = null;
if (typeof document.hidden !== 'undefined') { // Opera 12.10 and Firefox 18 and later support 
  hidden = 'hidden';
  visibilityChange = 'visibilitychange';
} else if (typeof document.msHidden !== 'undefined') {
  hidden = 'msHidden';
  visibilityChange = 'msvisibilitychange';
} else if (typeof document.webkitHidden !== 'undefined') {
  hidden = 'webkitHidden';
  visibilityChange = 'webkitvisibilitychange';
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      apiKey: "fc05c9fdbe7159bbb7865e7a0758f727",
      users: this.restoreFriends(),
      isFetching: false,
      hasContent: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.element.value !== "")
    {
      this.addFriend(this.element.value, true);
    }
  }

  handleRemove(event) {
    this.removeFriend(event);
  }

  getData()
  {
    var index = 0;

    this.state.users.forEach(element => 
    {
      fetch("https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user="
      +element.name+"&api_key="+this.state.apiKey+"&format=json&limit=1")
      .then(result2 => result2.json())
      .then(
        (result2) => {

          var foundUserId = this.state.users.findIndex(function(u) {
            return u.name === element.name;
          });

          var users = this.state.users;
          var foundUser = users[foundUserId];

          if (foundUser && result2.recenttracks)
          {
            foundUser.recenttrack = result2.recenttracks.track[0];

            if (foundUser.recenttrack)
            {
              if (!foundUser.recenttrack['@attr'])
              foundUser.recenttrack.date = foundUser.recenttrack.date.uts;

              foundUser.recenttrack.imageName = foundUser.recenttrack.image[2]['#text'];
              foundUser.recenttrack.artistName = foundUser.recenttrack.artist['#text'];
              users[foundUserId] = foundUser;
              this.setState({users: users});
            }
            else
            {
              this.removeFriend(element.name);
            }
          }
          else
          {
            this.removeFriend(element.name);
          }

          index++;

          if (index === this.state.users.length - 1)
          {
            this.setState({hasContent: true});
          }
        }
      )
    });

    if (!this.state.isFetching)
    {
      this.interval = setInterval(() => this.getData(), 5000);
      this.setState({isFetching: true});
    }
  }

  componentDidMount()
  {
    this.getData();
    
    document.addEventListener(visibilityChange, this.handleVisibilityChange, false);
    console.log("Component Mounted");
  }

  componentWillUnmount() {
    this.setState({isFetching: false});
    clearInterval(this.interval);
    document.removeEventListener(visibilityChange, this.handleVisibilityChange);

    console.log("Component Unmounted");
  }

  handleVisibilityChange = () => {
    if (document[hidden]) {
      this.setState({isFetching: false});
      clearInterval(this.interval);
    } else {
      this.getData();
    }
  }

  restoreFriends()
  {
    var cookieFriends = cookies.get('friends');

    if (cookieFriends)
    {
      return cookieFriends;
    }

    return [];
  }

  addFriend(name)
  {
    var newUsers = this.state.users;

    if (newUsers.length >= 5)
      return;

    if (newUsers.findIndex(function (u) {
      return u.name.toLowerCase() === name.toLowerCase();
    }) === -1)
    {
      var user = {name: name, recenttrack:{}};
      newUsers.push(user);
      this.setState({users: newUsers});
      
      this.getData();
    }

    cookies.set('friends', newUsers);
  }

  removeFriend(name)
  {
    var newUsers = this.state.users;

    newUsers = newUsers.filter(item => item.name.toLowerCase() !== name.toLowerCase());
    this.setState({users: newUsers});
    
    this.getData();
    cookies.set('friends', newUsers);
  }

  render() 
  {
    const formHtml = (
      <div id="friend-form">        
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="userInput">Last.fm Username</label>
            <input type="text" className="form-control" id="userInput" ref={el => this.element = el} placeholder="Username"/>
            <small id="emailHelp" className="form-text">See what your friends are listening to.</small>
          </div>
          <button type="submit" className="btn btn-primary">Add Friend</button>
        </form>
      </div> );

    const userHtml = (
      <div className="container-fluid">
        {this.state.users.map(user => (
          <div key={user.name}>
            <User
              user={user}
              handleRemove={this.handleRemove}
            />
          </div>
        ))}
      </div>
    );

    return (
      <div>
      {formHtml}
      {userHtml}
      </div>
    )
  }
}

export default App;