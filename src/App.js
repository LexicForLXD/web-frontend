import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


const Grid = require('react-bootstrap').Grid;
const Row = require('react-bootstrap').Row;
const Col = require('react-bootstrap').Col;

const Nav = require('react-bootstrap').Nav;
const NavItem = require('react-bootstrap').NavItem;

const Table = require('react-bootstrap').Table;


class App extends Component {
  constructor() {
    super();
    this.state = {
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
              <Navigation containers={this.state.containers} />
            </Col>
            <Col xs={9}>
              <Dashboard containers={this.state.containers} />
            </Col>
          </Row>
        </Grid>
      </div>
    );
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
  }

  render() {
    return (
      <Nav bsStyle="pills" stacked activeKey={this.state.page} onSelect={this.select}>
        <NavItem eventKey={1}>Overview</NavItem>
        {this.props.containers.map((container, index) =>
            <NavItem eventKey={index + 2}>{container.name}</NavItem>
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
          {this.props.containers.map(container =>
            <tr>
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
