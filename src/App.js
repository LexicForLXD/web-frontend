import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Console from './Console.js';
import Navigation from './Navigation.js';
import Dashboard from './Dashboard.js';
import { Grid, Row, Col } from 'react-bootstrap';

class App extends Component {
  constructor() {
    super();
    this.state = {
      log: [],
      containers: [
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
    };
  }

  logPush = (msg) => {
    const log =
      msg.constructor === Array ? [...this.state.log.slice(-9), ...msg]
                                : [...this.state.log.slice(-9), msg];
    this.setState({
      log: log
    });
  }

  componentDidMount() {
    this.logPush('App component mounted.');
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Lexic</h1>
        </header>
        <Grid>
          <Row>
            <Col xs={3}>
              <Navigation containers={this.state.containers}
                          logCallBack={msg => this.logPush(msg)} />
            </Col>
            <Col xs={9}>
              <Dashboard containers={this.state.containers}
                         logCallBack={msg => this.logPush(msg)} />
            </Col>
          </Row>
          <Row>
            <Col xs={9} xsOffset={3}>
              <Console log={this.state.log} />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default App;
