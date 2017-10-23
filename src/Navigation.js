import React, { Component } from 'react';
import './App.css';
import { Nav, NavItem, Button } from 'react-bootstrap';

class Navigation extends Component {
  constructor(props) {
    super();
    this.state = {
      page: 'overview'
    };
  }

  select = (key) => {
    this.setState({
      page: key
    });
    this.props.print(`Navigation: ${key} selected`);
  }

  render() {
    return (
      <div>
        <Nav stacked activeKey={this.state.page} onSelect={this.select}>
          <NavItem eventKey={'overview'}>
            <i className="fa fa-desktop"></i> Overview
          </NavItem>
          <NavItem eventKey={'monitoring'}>
            <i className="fa fa-area-chart"></i> Monitoring
          </NavItem>
          <NavItem eventKey={'log'}>
            <i className="fa fa-pencil"></i> Log
          </NavItem>
          <NavItem eventKey={'backup'}>
            <i className="fa fa-hdd-o"></i> Backup
          </NavItem>
          {this.props.containers.map((container, index) =>
            <NavItem key={index} eventKey={`container ${index + 1}`}>
              <i className="fa fa-cube"></i> {container.name}
            </NavItem>
          )}
        </Nav>
        <Button type="button" className="Refresh" onClick={this.props.refresh}>
          <i className="fa fa-refresh"></i> Refresh
        </Button>
      </div>
    );
  }
}

export default Navigation;
