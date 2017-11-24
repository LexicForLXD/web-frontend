import React, { Component } from 'react';
import './App.css';
import Navigation from './Navigation.js';
import MainArea from './MainArea.js';
import Login from './Login.js';

class App extends Component {
  constructor() {
    super();
    const accessToken = localStorage.getItem('accessToken');
    const loggedIn = accessToken &&
                     Date.now() < localStorage.getItem('expirationDate');
    this.state = {
      accessToken: accessToken,
      expirationDate: localStorage.getItem('expirationDate'),
      refreshToken: localStorage.getItem('refreshToken'),
      loggedIn: loggedIn
    };
  }

  setAccessToken = token => {
    this.setState({ accessToken: token });
    localStorage.setItem('accessToken', token);
  }

  setExpirationDate = seconds => {
    const expirationDate = Date.now() + seconds * 1000;
    this.setState({ expirationDate: expirationDate });
    localStorage.setItem('expirationDate', expirationDate);
  }

  setRefreshToken = token => {
    this.setState({ refreshToken: token });
    localStorage.setItem('refreshToken', token);
  }

  login = () => this.setState({ loggedIn: true });

  logout = () => {
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('accessToken');
    this.setState({ loggedIn: false });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <i className="fa fa-cubes fa-5x"></i>
          <h1 className="App-title">Lexic</h1>
        </header>
        <Login
          loggedIn={this.state.loggedIn}
          login={this.login}
          logout={this.logout}
          setAccessToken={this.setAccessToken}
          setExpirationDate={this.setExpirationDate}
          setRefreshToken={this.setRefreshToken}
        />
        {this.state.loggedIn &&
          <div>
            <div className="Navigation">
              <Navigation />
            </div>
            <div className="MainArea">
              <MainArea
                accessToken={this.state.accessToken}
                refreshToken={this.state.refreshToken}
                logout={this.logout}
              />
            </div>
          </div>
        }
      </div>
    );
  }
}

export default App;
