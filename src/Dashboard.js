import React, { Component } from 'react';
import './App.css';
import Containers from './Containers.js';
import { Table } from 'react-bootstrap';

class Dashboard extends Component {
  constructor(props) {
    super();
    this.state = {};
  }

  switchPageItems = () => {
    switch (this.props.page) {
      case 'containers':
        return (
          <Containers
            containers={this.props.containers}
          />
        );
        break;
      case 'hosts':
        return (
          <div>Not yet implemented...</div>
        )
        break;
    }
  }

  render() {
    return (
      <div>{this.switchPageItems()}</div>
    );
  }
}

export default Dashboard;
