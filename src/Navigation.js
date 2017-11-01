import React, { Component } from 'react';
import './App.css';
import { Navbar, NavDropdown, Nav, NavItem, Button } from 'react-bootstrap';

class Navigation extends Component {
  constructor(props) {
    super();
  }

  select = (key) => {
    this.props.setPage(key);
    this.props.print(`Navigation: ${key} selected`);
  }

  render() {
    return (
          <Nav bsStyle="tabs" activeKey={this.props.page} onSelect={this.select}>
            <NavItem eventKey={'containers'}>
              <i className="fa fa-cube"></i> Containers
            </NavItem>
            <NavItem eventKey={'hosts'}>
              <i className="fa fa-server"></i> Hosts
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
          </Nav>
    );
  }
}

export default Navigation;
