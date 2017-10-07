import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const Grid = require('react-bootstrap').Grid;
const Row = require('react-bootstrap').Row;
const Col = require('react-bootstrap').Col;

const Nav = require('react-bootstrap').Nav;
const NavItem = require('react-bootstrap').NavItem;

class App extends Component {
  constructor() {
    super();
    this.state = {
      servers: ['Server 1', 'Server 2', 'Server 3']
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
              <Navigation servers={this.state.servers}/>
            </Col>
            <Col>

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
        {this.props.servers.map((server, index) =>
          <NavItem eventKey={index + 2}>{server}</NavItem>
        )}
      </Nav>
    );
  }
}

export default App;
