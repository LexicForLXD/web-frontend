import React, { Component } from 'react';
import './App.css';
import Navigation from './Navigation.js';
import MainArea from './MainArea.js';
import Login from './Login.js';

class App extends Component {
  constructor() {
    super();
    const accessToken = localStorage.getItem('accessToken');
    this.state = {
      page: 'containers',
      accessToken: accessToken,
      refreshToken: localStorage.getItem('refreshToken'),
      loggedIn: accessToken ? true : false
    };
  }

  setAccessToken = token => {
    this.setState({ accessToken: token });
    localStorage.setItem('accessToken', token);
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
          setRefreshToken={this.setRefreshToken}
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
