import React, { Component } from 'react';
import './App.css';
import './Loader.css';
import User from './components/User'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      apiKey: "fc05c9fdbe7159bbb7865e7a0758f727",
      users: ["roo_220", "mazemagic", "ikuzomi", "bkrpage94"],
    };
  }



  render() {
    const { users } = this.state
    console.log("Users: ", users.length)
    return (
      <div className="container-fluid">

 {users.map(user => (
          <div key={user}>
            <User
              user={user}
            />
          </div>

        ))}

      </div>

    )
  }
}

export default App;