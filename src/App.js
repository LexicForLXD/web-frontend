import React, { Component } from 'react';
import logo from './containers.png';
import './App.css';
import Console from './Console.js';
import Navigation from './Navigation.js';
import Sidebar from './Sidebar.js';
import MainArea from './MainArea.js';
import Login from './Login.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: true,
      page: 'containers',
      containers: [],
      hosts: [],
    };
  }

  componentDidMount() {
    this.refresh();
  }

  refresh = () => {
    this.fetchContainers();
    this.fetchHosts();
  }

  fetchContainers = () => {
    this.setState({
      containers: [  // To be replaced with a fetch()-from-api method call
        {
          name: "Container 1",
          ip: "10.16.18.20",
          status: "running"
        },
        {
          name: "Container 2",
          ip: "10.16.18.21",
          status: "stopped"
        },
        {
          name: "Container 3",
          ip: "10.16.18.22",
          status: "running"
        }
      ]
    })
  }

  fetchHosts = () => {
    this.setState({
      hosts: [  // To be replaced with a fetch()-from-api method call
        {
          name: "Host 1",
          ip: "10.16.18.20",
          status: "running"
        },
        {
          name: "Host 2",
          ip: "10.16.18.21",
          status: "stopped"
        },
        {
          name: "Host 3",
          ip: "10.16.18.22",
          status: "running"
        }
      ],
    })
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
                containers={this.state.containers}
                hosts={this.state.hosts}
                refresh={this.refresh}
              />
            </div>
          </div>
        }
      </div>
    );
  }
}

export default App;
