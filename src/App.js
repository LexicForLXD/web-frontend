import React, { Component } from 'react';
import logo from './containers.png';
import './App.css';
import Console from './Console.js';
import Navigation from './Navigation.js';
import Dashboard from './Dashboard.js';
import Login from './Login.js';
import { Grid, Row, Col, Button } from 'react-bootstrap';

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      containers: [],
      printQueue: []
    };
  }

  componentDidMount() {
    this.refresh();
  }

  refresh = () => {
    this.fetchContainers();
    this.print('App: refreshed')
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

  print = (msg) => {
    const printQueue =
      msg.constructor === Array ? [...this.state.printQueue, ...msg]
                                : [...this.state.printQueue, msg];
    this.setState({
      printQueue: printQueue.slice(-5)
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">LXD</h1>
        </header>
        <Login loggedIn={this.state.loggedIn}
               login={() => this.setState({ loggedIn: true })}
               logout={() => this.setState({ loggedIn: false })}
               print={msg => this.print(msg)}
        />
        {this.state.loggedIn &&
          <Grid>
            <Row>
              <Col xs={3}>
                <Navigation containers={this.state.containers}
                            print={msg => this.print(msg)}
                            refresh={this.refresh}
                />
              </Col>
              <Col xs={9}>
                <Dashboard containers={this.state.containers}
                           print={msg => this.print(msg)}
                />
              </Col>
            </Row>
            <Row>
              <Col xs={9} xsOffset={3}>
                <Console printQueue={this.state.printQueue} />
              </Col>
            </Row>
          </Grid>
        }
      </div>
    );
  }
}

export default App;
