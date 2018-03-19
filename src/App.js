import React, { Component } from 'react';
import './App.css';
import Navigation from './Navigation.js';
import MainArea from './MainArea.js';
import Login from './Login.js';


/**
 * LEXIC's top level component
 */
class App extends Component {

  /**
   * Tries to get oauth2 access token and token expiration data
   * from browser's local storage. Logs the user in if it finds a token and the
   * token isn't expired.
   */
  constructor() {
    super();
    const accessToken = localStorage.getItem('accessToken');
    const loggedIn = accessToken &&
                     Date.now() < localStorage.getItem('expirationDate');
    this.state = {
      apiUrl: 'https://localhost:443/',
      accessToken: accessToken,
      expirationDate: localStorage.getItem('expirationDate'),
      refreshToken: localStorage.getItem('refreshToken'),
      loggedIn: loggedIn
    };
  }

  /**
   * Adds an access token to the component's state.
   * @param {string} token OAuth2 access token
   */
  setAccessToken = token => {
    this.setState({ accessToken: token });
    localStorage.setItem('accessToken', token);
  }

  /**
   * Adds an access token expiration data to the component's state.
   * @param {number} seconds expiration time in seconds
   */
  setExpirationDate = seconds  => {
    const expirationDate = Date.now() + seconds * 1000;
    this.setState({ expirationDate: expirationDate });
    localStorage.setItem('expirationDate', expirationDate);
  }



  /**
   * Adds an access token to the component's state.
   * @param {string} token Oauth2 refresh token
   */
  setRefreshToken = token => {
    this.setState({ refreshToken: token });
    localStorage.setItem('refreshToken', token);
  }


  /**
   * Logs the user in.
   */
  login = () => {
    this.setState({ loggedIn: true })
  };


  /**
   * Removes refresh and access token from browser's local storage and logs the
   * user out.
   */
  logout = () => {
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('accessToken');
    this.setState({ loggedIn: false });
  }


  /**
   * Renders the component.
   * @returns {jsx} component html code
   */
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <i className="fa fa-cubes fa-5x"></i>
          <h1 className="App-title"><b>LEXIC</b></h1>
        </header>
        <Login
          apiUrl={this.state.apiUrl}
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
                apiUrl={this.state.apiUrl}
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
