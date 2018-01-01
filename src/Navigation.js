import React, { Component } from 'react';
import './App.css';
import { Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

class Navigation extends Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <Nav bsStyle="tabs">
        <LinkContainer to="/containers">
          <NavItem>
            <i className="fa fa-cube"></i> Containers
          </NavItem>
        </LinkContainer>
        <LinkContainer to="/profiles">
          <NavItem>
            <i className="fa fa-file-text"></i> Profiles
          </NavItem>
        </LinkContainer>
        <LinkContainer to="/hosts">
          <NavItem>
            <i className="fa fa-server"></i> Hosts
          </NavItem>
        </LinkContainer>
        <LinkContainer to="/monitoring">
          <NavItem>
            <i className="fa fa-area-chart"></i> Monitoring
          </NavItem>
        </LinkContainer>
        <LinkContainer to="/logs">
          <NavItem>
            <i className="fa fa-pencil"></i> Logs
          </NavItem>
        </LinkContainer>
        <LinkContainer to="/backup">
          <NavItem>
            <i className="fa fa-hdd-o"></i> Backup
          </NavItem>
        </LinkContainer>
      </Nav>
    );
  }
}

export default Navigation;
