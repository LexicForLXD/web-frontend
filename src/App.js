import React, { Component } from 'react';
import './App.css';
import Navigation from './Navigation.js';
import MainArea from './MainArea.js';
import Login from './Login.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      page: 'containers'
    };
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <i className="fa fa-cubes fa-5x"></i>
          <h1 className="App-title">LXC Containers</h1>
        </header>
        <Login
          loggedIn={this.state.loggedIn}
          login={() => this.setState({ loggedIn: true })}
          logout={() => this.setState({ loggedIn: false })}
          setAccessToken={token => this.setState({ accessToken: token})}
          setRefreshToken={token => this.setState({ refreshToken: token})}
        />
        {this.state.loggedIn &&
          <div>
            <div className="Navigation">
              <Navigation
                page={this.state.page}
                setPage={page => this.setState({ page: page })}
              />
            </div>
            <div className="MainArea">
              <MainArea
                page={this.state.page}
                accessToken={this.state.accessToken}
                refreshToken={this.state.refreshToken}
              />
            </div>
          </div>
        }
      </div>
    );
  }
}

export default App;
