import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const Grid = require('react-bootstrap').Grid;
const Row = require('react-bootstrap').Row;
const Col = require('react-bootstrap').Col;
const Nav = require('react-bootstrap').Nav;
const NavItem = require('react-bootstrap').NavItem;
const Table = require('react-bootstrap').Table;
const Well = require('react-bootstrap').Well;

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
    const log = [...this.state.log.slice(-9), ...msg]
    this.setState({
      log: log
    });
  }

  componentDidMount() {
    this.logPush(['Ready...'])
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

class Console extends Component {
  render() {
    return (
      <Well bsSize="small" className="Log">
        <Grid>
          {this.props.log.map((msg, index) =>
            <Row key={index}>
              {msg}
            </Row>
          )}
      </Grid>
    </Well>
    )
  }
}

class Navigation extends Component {
  constructor(props) {
    super();
    this.state = {
      page: 1
    };
  }

  select = (key) => {
    this.setState({
      page: key
    });
    this.props.logCallBack([`${key} selected`]);
  }

  render() {
    return (
      <Nav bsStyle="pills" stacked activeKey={this.state.page} onSelect={this.select}>
        <NavItem eventKey={1}>Overview</NavItem>
        {this.props.containers.map((container, index) =>
          <NavItem key={index} eventKey={index + 2}>{container.name}</NavItem>
        )}
      </Nav>
    );
  }
}

class Dashboard extends Component {
  constructor(props) {
    super();
    this.state = {
      page: 1
    };
  }

  render() {
    return (
      <Table bordered condensed>
        <thead>
          <tr>
            <th>Status</th>
            <th>Name</th>
            <th>IP Address</th>
            <th>Control</th>
          </tr>
        </thead>
        <tbody>
          {this.props.containers.map((container, index) =>
            <tr key={index}>
              <td>{container.status}</td>
              <td>{container.name}</td>
              <td>{container.ip}</td>
              <td>
                <button type="button" className="btn">
                  <i className="fa fa-play"></i>
                </button>
                <button type="button" className="btn">
                  <i className="fa fa-stop"></i>
                </button>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    );
  }
}

export default App;
